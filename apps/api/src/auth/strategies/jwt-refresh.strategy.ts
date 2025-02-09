import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';
import { JWTPayload } from '../interfaces/jwt-payload';



@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor(
        private configService: ConfigService,
        private usersService: UsersService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                JwtRefreshStrategy.extractJwtFromCookie
            ]),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_REFRESH_SECRET')!,
            passReqToCallback: true
        });
    }

    async validate(req: Request, payload: JWTPayload): Promise<JWTPayload> {
        // const refresh_token = req.cookies.refresh_token;
        // if (!refresh_token) throw new UnauthorizedException('No Refresh token');
        return payload;
    }

    public static extractJwtFromCookie(req: Request): string | null {
        if (req.cookies && req.cookies.refresh_token) {
            return req.cookies.refresh_token;
        }
        return null;
    }
}