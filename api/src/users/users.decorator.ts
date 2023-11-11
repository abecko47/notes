import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UsersDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return {
        username: request.user.username,
        createdAt: request.user.createdAt,
        id: request.user.id,
    };
  },
);
