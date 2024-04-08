require("dotenv").config();
import { forwardRef, Inject, Injectable } from "@nestjs/common";

import { User } from "@parsimony/types";
import jwt from "jsonwebtoken";
import { modelTypes } from "../app/models";
import { AppDataGateway } from "../app/app.data.gateway";

@Injectable()
export default class TokenService {
  #adg: AppDataGateway;

  constructor(@Inject(forwardRef(() => AppDataGateway)) adg: AppDataGateway) {
    this.#adg = adg;
  }

  /**
   *
   * Generates a JWT access token then will expire every 15min
   *
   * @param {User} user
   */
  public generateAccessToken = (user: User) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as string, {
      expiresIn: "5h"
    });
  };

  /**
   *
   * Generates a JWT refresh token with no expiration
   *
   * The only way to remove a refresh token is by removing it from the database
   *
   * @param {User} user
   */
  public generateRefreshToke = (user: User, schoolId: string) => {
    const refreshToken = jwt.sign(
      user,
      process.env.REFRESH_TOKEN_SECRET as string
    );
    void this.saveRefreshToken(refreshToken, user.id, schoolId);
    return refreshToken;
  };

  /**
   *
   * Verifies a JWT Access token with no expiration
   *
   *
   * @param {string} token
   * @param {(error: any, payload: any) => void} cb
   */
  public verifyAccessToken = async (token: string) => {
    let currentUser;
    this._verifyToken(
      token,
      process.env.ACCESS_TOKEN_SECRET as string,
      (err, user) => {
        if (err) {
          throw Error("Invalid Access Token");
        }
        currentUser = user;
      }
    );
    return { currentUser };
  };

  /**
   *
   * Verifies a JWT refresh token with no expiration
   *
   * The only way to remove a refresh token is by removing it from the database
   *
   * @param {string} token
   * @param {(error: any, payload: any) => void} cb
   */
  public verifyRefreshToken = async (token: string, schoolId: string) => {
    const isRefreshTokenValid = await this.isRefreshTokenValid(token, schoolId);
    if (!isRefreshTokenValid) {
      throw new Error("Invalid Refresh Token");
    }

    let userId;
    this._verifyToken(
      token,
      process.env.REFRESH_TOKEN_SECRET as string,
      (err, user) => {
        if (err) {
          throw Error(err);
        }
        userId = user;
      }
    );

    const user = await this.#adg
      .dbBySchoolId(schoolId)
      .findEntry(modelTypes.user, { _id: userId });
    const accessToken = this.generateAccessToken(user.toObject());

    return { accessToken, user };
  };

  /**
   *
   * Verifies a JWT token with no expiration and runs a callback function with passing in an error or payload from JWT
   *
   *
   * @param {string} token
   * @param {string} secret
   * @param {(error: any, payload: any) => void} cb
   */
  private _verifyToken = (
    token: string,
    secret: string,
    cb: (error: any, payload: any) => void
  ) => {
    jwt.verify(token, secret, cb);
  };

  /**
   *
   * Adds refresh token to the database
   *
   *
   * @param {String} token
   */
  public saveRefreshToken = async (
    token: string,
    userId: string,
    schoolId: string
  ) => {
    await this.#adg
      .dbBySchoolId(schoolId)
      .createEntry(modelTypes.refreshToken, { token, userId });
  };

  /**
   *
   * Removes refresh token from the database
   *
   * @param {String} token
   */
  public deleteRefreshToken = async (token: string, schoolId: string) => {
    const db = this.#adg.dbBySchoolId(schoolId);
    const foundToken = await db.findEntry(modelTypes.refreshToken, {
      token
    });
    await db.deleteEntry(modelTypes.refreshToken, foundToken._id);
  };

  /**
   *
   * Verifies refresh token exists the database
   *
   * @param {String} token
   * @returns {Boolean}
   */
  public isRefreshTokenValid = async (
    token: string,
    schoolId: string
  ): Promise<boolean> => {
    return await this.#adg
      .dbBySchoolId(schoolId)
      .findEntry(modelTypes.refreshToken, {
        token
      });
  };
}
