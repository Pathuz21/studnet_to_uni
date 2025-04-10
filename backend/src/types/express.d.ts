import { Request } from 'express';
import { Document } from 'mongoose';

interface IUser extends Document {
  _id: string;
  email: string;
  password: string;
  role: 'student' | 'university';
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  isVerified: boolean;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
} 