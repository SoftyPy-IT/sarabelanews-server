/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';
import { TUser } from './user.interface';
import { User } from './user.model';
import { createToken } from '../Auth/auth.utils';
import config from '../../config';

const createUser = async (payload: TUser) => {
  const user = await User.isUserExistsByCustomId(payload.email);
  if (user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User already exists!');
  }

  const result = await User.create(payload);

  // Create JWT payload
  const JwtPayload = {
    userId: result._id as unknown as string,
    role: result.role,
    name: result.name,
  };

  // Generate access token and refresh token
  const accessToken = createToken(
    JwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    JwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
    user: {
      userId: result._id,
      name: result.name,
      role: result.role,
      token: accessToken,
    },
  };
};

const getAllUser = async () => {
  const result = await User.find();
  return result;
};
const deleteUser = async (id: string) => {
  const result = await User.deleteOne({ _id: id });

  return result;
};


export const UserServices = {
  createUser,
  getAllUser,
  deleteUser
};
