import bcrypt from 'bcryptjs';
import { CONSTANTS } from '../config/constants';

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(CONSTANTS.AUTH.SALT_ROUNDS);
  return bcrypt.hash(password, salt);
};

export const comparePasswords = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};
