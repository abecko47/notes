import * as process from 'process';
import 'dotenv/config';

export const jwtConstants = {
  secret: process.env.JWT_SECRET,
};
