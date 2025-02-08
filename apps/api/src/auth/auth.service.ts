import { Injectable } from '@nestjs/common';
import { AuthTokens } from './interfaces/auth-tokens';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JWTPayload } from './interfaces/jwt-payload';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private configService: ConfigService,
        private jwtService: JwtService,
        private usersService: UsersService
    ) { }

    async authenticate(payload: JWTPayload): Promise<AuthTokens> {
        const tokens = await this.generateTokens(payload);
        await this.usersService.saveRefreshToken(tokens.refresh_token, payload.sub);
        return tokens;
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

    async validateUser(email: string, password: string): Promise<JWTPayload | null> {
        const user = await this.usersService.findByEmail(email);
        let payload: JWTPayload;
        if (user && await bcrypt.compare(password, user.password)) {
            const { password, created_at, full_name, ...result } = user;
            payload = {sub: user.id, email: user.email};
            return payload;
        }
        return null;
    }
}
