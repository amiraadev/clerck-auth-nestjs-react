import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [UserResolver, UserService,JwtService]
})
export class UserModule {}
