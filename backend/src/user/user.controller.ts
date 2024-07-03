import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GraphqlAuthGuard } from 'src/auth/auth.guard';

@UseGuards(GraphqlAuthGuard)
@Controller('user')
export class UserController {
  constructor(private jwtService: JwtService) {}

  @Get()
  async returnName() {
    return 'hello Amira';
  }
}
