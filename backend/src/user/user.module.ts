import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { UserController } from './user.controller';

@Module({
  providers: [UserResolver, UserService,JwtService],
  controllers: [UserController]
})
export class UserModule {}
