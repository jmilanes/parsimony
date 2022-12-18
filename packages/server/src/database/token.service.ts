require("dotenv").config();
import { User } from "@parsimony/types/src";
import jwt from "jsonwebtoken";
import { DataBaseService } from "./dataBase.service";
import { modelTypes } from "./models";

export default class TokensService {
  refreshTokens: string[];
  db: DataBaseService;
  constructor(db: DataBaseService) {
    // This will be DB
    this.refreshTokens = [];
    this.db = db;
  }

  /**
   *
   * Generates a JWT access token then will expire every 15min
   *
   * @param {User} token
   */
  public generateAccessToken(user: User) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as string, {
      expiresIn: "10m"
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
    this.saveRefreshToken(refreshToken);
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
    const isRefreshTokenValid = this.isRefreshTokenValid(token);

    if (!isRefreshTokenValid) {
      throw new Error("Invalid Refresh Token");
    }

    let userId;
    let accessToken;
    this._verifyToken(
      token,
      process.env.REFRESH_TOKEN_SECRET as string,
      (err, user) => {
        if (err) {
          throw Error(err);
        }
        userId = user;
        accessToken = this.generateAccessToken(user);
      }
    );

    const user = await this.db.findEntry(modelTypes.user, { _id: userId });

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
  public saveRefreshToken(token: string) {
    this.refreshTokens = [...this.refreshTokens, token];
  }

  /**
   *
   * Removes refresh token from the database
   *
   * @param {String} token
   */
  public deleteRefreshToken(token: string) {
    this.refreshTokens = this.refreshTokens.filter(
      (refreshToken) => refreshToken !== token
    );
  }

  /**
   *
   * Verifies refresh token exists the database
   *
   * @param {String} token
   * @returns {Boolean}
   */
  public isRefreshTokenValid(token: string): Boolean {
    return this.refreshTokens.includes(token);
  }
}
