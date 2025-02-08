import { Injectable } from '@nestjs/common';
import { AuthTokens } from './interfaces/auth-tokens';
import { CreateUserDto } from './dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JWTPayload } from './interfaces/jwt-payload';
import { UsersService } from 'src/users/users.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(
        private configService: ConfigService,
        private jwtService: JwtService,
        private usersService: UsersService
    ) { }

    async signup(createUserDto: CreateUserDto): Promise<AuthTokens> {
        const user = await this.usersService.create(createUserDto);
        const { access_token, refresh_token } = await this.generateTokens({ sub: user.id, email: user.email });
        await this.usersService.saveRefreshToken({ user: { connect: { id: user.id } }, refresh_token }, user.id);
        return { access_token, refresh_token }
    }

    private async generateTokens(payload: JWTPayload): Promise<AuthTokens> {
        const [access_token, refresh_token] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
                expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRY')
            }),
            this.jwtService.signAsync(payload, {
                secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
                expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRY')
            })
        ]);
        return {
            access_token,
            refresh_token
        }
    }
}
