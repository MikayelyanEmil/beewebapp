import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { TokensModule } from 'src/tokens/tokens.module';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';

@Module({
  imports: [UsersModule, TokensModule],
  controllers: [AuthController],
  providers: [AuthService, JwtService, LocalStrategy, JwtAccessStrategy]
})
export class AuthModule {}
