import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../../config';
// import { IUser, IUserMethods, UserModel } from './user.interface';

import { IUser, UserModel } from './user.interface';

// const UserSchema = new Schema<IUser, Record<string, never>, IUserMethods>(
const UserSchema = new Schema<IUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// using instance

// UserSchema.methods.isUserExists = async function (
//   id: string
// ): Promise<Partial<IUser> | null> {
//   return await User.findOne({ id }, { id: 1 }, { needsPasswordChange: 1 });
// };

// UserSchema.methods.isPasswordMatch = async function (
//   givenPassword: string,
//   savedPassword: string
// ): Promise<boolean> {
//   return await bcrypt.compare(givenPassword, savedPassword);
// };

// using statics

UserSchema.statics.isUserExists = async function (
  id: string
): Promise<Pick<IUser, 'id' | 'password' | 'role' | 'needsPasswordChange'> | null> {
  return await User.findOne(
    { id },
    { id: 1, password: 1, role: 1, needsPasswordChange: 1 }
  );
};

UserSchema.statics.isUserExists = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

// password hash before save
UserSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round)
  );
  next();
});

export const User = model<IUser, UserModel>('User', UserSchema);
