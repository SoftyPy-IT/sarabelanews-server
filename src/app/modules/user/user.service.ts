/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';
import { TUser } from './user.interface';
import { User } from './user.model';
import { createToken } from '../Auth/auth.utils';
import config from '../../config';
import bcrypt from 'bcrypt';

const createUser = async (payload: TUser) => {
  const userByEmail = await User.isUserExistsByCustomId(payload.email);
  if (userByEmail) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Email is already registered!'); 
  }

  // Check if the name already exists
  const userByName = await User.isUserExistsByCustomId(payload.name);
  if (userByName) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Username is already taken!');
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

const getCurrentUser = async (userId: string) => {
  const user = await User.findById(userId).select('name email role');
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  return user;
};

const updateUser = async (id: string, payload: Partial<TUser>) => {
  // Check if user exists
  const user = await User.findById(id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  // If password is being updated, hash it properly
  if (payload.password) {
    payload.password = await bcrypt.hash(payload.password, Number(config.default_pass));
    payload.passwordChangeAt = new Date();
  }

  // Use findByIdAndUpdate for proper updating
  const result = await User.findByIdAndUpdate(
    id,
    { $set: payload },
    { new: true, runValidators: true }
  );

  return result;
};





const deleteUser = async (id: string) => {
  const result = await User.deleteOne({ _id: id });

  return result;
};


export const UserServices = {
  createUser,
  getAllUser,
  getCurrentUser,
  updateUser,
  deleteUser
};
