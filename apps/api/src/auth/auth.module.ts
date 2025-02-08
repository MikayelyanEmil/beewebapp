import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { TokensModule } from 'src/tokens/tokens.module';

@Module({
  imports: [UsersModule, TokensModule],
  controllers: [AuthController],
  providers: [AuthService, JwtService, LocalStrategy]
})
export class AuthModule {}
