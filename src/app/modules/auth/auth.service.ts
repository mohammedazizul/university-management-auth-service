/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { JWTHelpers } from '../../../helpers/jswtHelpers';
import { User } from '../user/user.model';
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload;

  // using statics
  const isUserExists = await User.isUserExists(id);

  // using instance
  // const user = new User();
  // const isUserExists = await user.isUserExists(id);

  if (!isUserExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exists');
  }

  // using instance
  // if (isUserExists.password && !user.isPasswordMatch(password, isUserExists?.password)) {
  //   throw new ApiError(httpStat  us.UNAUTHORIZED, 'Password is incorrect');
  // }

  // using statics
  if (
    isUserExists.password &&
    !(await User.isPasswordMatched(password, isUserExists?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  const { id: userId, role, needsPasswordChange } = isUserExists;
  const accessToken = JWTHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = JWTHelpers.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  // eslint-disable-next-line no-console
  console.log({ accessToken, refreshToken, needsPasswordChange });

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  // verify token
  let verifiedToken = null;
  try {
    verifiedToken = JWTHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
    // eslint-disable-next-line no-console
    console.log(verifiedToken);
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refresh token');
  }

  const { userId } = verifiedToken;

  // user not exists but token exists

  const isUserExists = await User.isUserExists(userId);

  if (!isUserExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exists');
  }

  // generate new token
  const newAccessToken = JWTHelpers.createToken(
    { id: isUserExists.id, role: isUserExists.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  loginUser,
  refreshToken,
};
