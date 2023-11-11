import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from './prisma/prisma.service';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, NotesModule],
  controllers: [AppController],
  providers: [UsersService, JwtService, PrismaService],
})
export class AppModule {}
