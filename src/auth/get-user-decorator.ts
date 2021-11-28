import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './user.entity';

export const GetUser = createParamDecorator(
  // remove jslint unused param using _
  (_data, ctx: ExecutionContext): User => {
    // get actual request body
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
