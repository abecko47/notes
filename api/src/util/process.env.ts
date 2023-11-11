import * as process from 'process';
import 'dotenv/config';
import { BadRequestException } from '@nestjs/common';

export const jwtConstants = {
  secret: process.env.JWT_SECRET,
};

export const throwIfUserIsNotOwner = (
  userId: string,
  comparedUserId: string,
) => {
  if (userId !== comparedUserId) {
    throw new BadRequestException();
  }
};
