import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export type AuthContext = {
  token: string;
};

export const AuthContext = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): AuthContext => {
    const request = ctx.switchToHttp().getRequest();
    const token = request.headers?.authorization?.split(" ")[1];
    return { token };
  }
);
