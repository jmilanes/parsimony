import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import TokenService from "../../../database/token.service";

@Injectable()
export class AuthGuardDecorator implements CanActivate {
  #ts: TokenService;

  constructor(ts: TokenService) {
    this.#ts = ts;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    return await this.#validate(request);
  }

  #validate = async (req: any) => {
    try {
      return await this.#ts.verifyAccessTokenFromAuthorization(
        req.headers?.authorization
      );
    } catch (e) {
      return false;
    }
  };
}
