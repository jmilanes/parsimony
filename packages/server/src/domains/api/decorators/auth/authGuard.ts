import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import TokenService from "../../../database/token.service";

@Injectable()
export class AuthGuard implements CanActivate {
  #ts: TokenService;

  constructor(ts: TokenService) {
    this.#ts = ts;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    return await this.#validate(request);
  }

  #validate = async (req: any) => {
    const accessToken = req.headers?.authorization?.split(" ")[1];
    if (!accessToken) {
      return false;
    }

    try {
      await this.#ts.verifyAccessToken(accessToken);
    } catch (e) {
      return false;
    }
    // WE can still do the check for the user School
    // DB here and users will have school
    return true;
  };
}
