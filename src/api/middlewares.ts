// Middleware includes the logged in user in requests

import {
  authenticate,
  type MedusaNextFunction,
  type MedusaRequest,
  type MedusaResponse,
  type MiddlewaresConfig,
  type User,
  type UserService,
} from '@medusajs/medusa';
import { parseCorsOrigins } from 'medusa-core-utils';
import * as cors from 'cors'; 

const registerLoggedInUser = async (
  req: MedusaRequest,
  res: MedusaResponse,
  next: MedusaNextFunction
) => {
  let loggedInUser: User | null = null;

  if (req.user && req.user.userId) {
    const userService = req.scope.resolve('userService') as UserService;
    loggedInUser = await userService.retrieve(req.user.userId);
  }

  req.scope.register({
    loggedInUser: {
      resolve: () => loggedInUser,
    },
  });

  next();
};

// To get around CORS problems
export const config: MiddlewaresConfig = {
  routes: [
    {
      matcher:
        /^\/admin\/(?!auth|analytics-config|users\/reset-password|users\/password-token|invites\/accept).*/,
      middlewares: [
        cors.default({
          credentials: true,
          origin: parseCorsOrigins(process.env.ADMIN_CORS),
        }),
        authenticate(),
        registerLoggedInUser,
      ],
    },
  ],
};
