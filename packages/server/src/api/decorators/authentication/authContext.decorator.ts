import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export type AuthContext = {
  authorization: string;
};

export const AuthContext = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): AuthContext => {
    const request = ctx.switchToHttp().getRequest();
    const authorization = request.headers?.authorization;
    return { authorization };
  }
);
