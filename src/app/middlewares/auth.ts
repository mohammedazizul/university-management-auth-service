import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import { JWTHelpers } from '../../helpers/jswtHelpers';

const auth =
  (...requireRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get authorization token
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
      }
      // verify token
      let verifiedUser = null;

      verifiedUser = JWTHelpers.verifyToken(
        token,
        config.jwt.refresh_secret as Secret
      );
      // eslint-disable-next-line no-console
      console.log(verifiedUser);

      // adding to request
      req.user = verifiedUser;

      // role guard
      if (requireRoles.length && !requireRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
      }
      // all clear go for next
      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
