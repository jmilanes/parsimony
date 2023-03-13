require("dotenv").config();
import { User } from "@parsimony/types";
import jwt from "jsonwebtoken";
import { DataBaseService } from "./dataBase.service";
import { modelTypes } from "./models";

export default class TokensService {
  refreshTokens: string[];
  private _db: DataBaseService;
  constructor(db: DataBaseService) {
    // This will be DB
    this.refreshTokens = [];
    this._db = db;
  }

  /**
   *
   * Generates a JWT access token then will expire every 15min
   *
   * @param {User} token
   */
  public generateAccessToken(user: User) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as string, {
      expiresIn: "5h"
    });
  }

  /**
   *
   * Generates a JWT refresh token with no expiration
   *
   * The only way to remove a refresh token is by removing it from the database
   *
   * @param {User} user
   */
  public generateRefreshToke(user: User) {
    const refreshToken = jwt.sign(
      user,
      process.env.REFRESH_TOKEN_SECRET as string
    );
    this.saveRefreshToken(refreshToken, user.id);
    return refreshToken;
  }

  /**
   *
   * Verifies a JWT Access token with no expiration
   *
   *
   * @param {string} token
   * @param {string} secret
   * @param {(error: any, payload: any) => void} cb
   */
  public async verifyAccessToken(token: string) {
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
  }

  /**
   *
   * Verifies a JWT refresh token with no expiration
   *
   * The only way to remove a refresh token is by removing it from the database
   *
   * @param {string} token
   * @param {(error: any, payload: any) => void} cb
   */
  public async verifyRefreshToken(token: string) {
    const isRefreshTokenValid = await this.isRefreshTokenValid(token);
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

    const user = await this._db.findEntry(modelTypes.user, { _id: userId });
    const accessToken = this.generateAccessToken(user.toObject());

    return { accessToken, user };
  }

  /**
   *
   * Verifies a JWT token with no expiration and runs a callback function with passing in an error or payload from JWT
   *
   *
   * @param {string} token
   * @param {string} secret
   * @param {(error: any, payload: any) => void} cb
   */
  private _verifyToken(
    token: string,
    secret: string,
    cb: (error: any, payload: any) => void
  ) {
    jwt.verify(token, secret, cb);
  }

  /**
   *
   * Adds refresh token to the database
   *
   *
   * @param {String} token
   */
  public async saveRefreshToken(token: string, userId: string) {
    await this._db.createEntry(modelTypes.refreshToken, { token, userId });
  }

  /**
   *
   * Removes refresh token from the database
   *
   * @param {String} token
   */
  public async deleteRefreshToken(token: string) {
    const foundToken = await this._db.findEntry(modelTypes.refreshToken, {
      token
    });
    await this._db.deleteEntry(modelTypes.refreshToken, foundToken._id);
  }

  /**
   *
   * Verifies refresh token exists the database
   *
   * @param {String} token
   * @returns {Boolean}
   */
  public async isRefreshTokenValid(token: string): Promise<boolean> {
    return await this._db.findEntry(modelTypes.refreshToken, {
      token
    });
  }
}
