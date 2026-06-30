import { Document, Model } from "mongoose";
import { UserRole } from "../../constants/auth.ts";
import { UserStatus } from "../../constants/auth.ts";
import { GenderTypes } from "../../constants/user.ts";

export interface IUser extends Document {
  first_name: string;
  last_name: string;
  email: string;
  email_verified_at: Date | null;
  password: string;

  passwordChangedAt?: Date;
  passwordResetCode?: string;
  passwordResetExpires?: Date;
  passwordResetVerified: boolean;

  role: UserRole;
  status: UserStatus;

  gender: GenderTypes | null;

  phone?: string;
  avatar: string | null;

  birth_date?: Date;
  last_login_at?: Date;

  is_delete: boolean;

  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IUserModel extends Model<IUser> {}