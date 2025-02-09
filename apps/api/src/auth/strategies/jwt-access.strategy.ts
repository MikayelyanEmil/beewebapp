import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { JWTPayload } from '../interfaces/jwt-payload';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService: ConfigService,
        private usersService: UsersService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_ACCESS_SECRET')!
        });
    }

    async validate(payload: JWTPayload): Promise<JWTPayload> {
        // const user = await this.usersService.findByEmail(payload.email);
        // if (!user) return null;
        return payload;
    }
}