import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import TokenService from "../../../services/database/token.service";

import { Reflector } from "@nestjs/core";
import { UserRoles } from "@parsimony/types";

export const AllowedRoles = Reflector.createDecorator<UserRoles[]>();

@Injectable()
export class RolesGuard implements CanActivate {
  #ts: TokenService;
  #reflector: Reflector;

  constructor(ts: TokenService, reflector: Reflector) {
    this.#ts = ts;
    this.#reflector = reflector;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.#reflector.get(AllowedRoles, context.getHandler());
    if (!roles.length) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = await this.#ts.getUserFromAuthorization(
      request.headers?.authorization
    );
    return roles.some((role) => role === user.type);
  }
}
