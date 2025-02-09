import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { JWTPayload } from '../interfaces/jwt-payload';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({ usernameField: 'email' });
    }

    async validate(email: string, password: string): Promise<JWTPayload> {
        const payload = await this.authService.validateUser(email, password);
        if (!payload) throw new UnauthorizedException('Incorrect email or password.')
        return payload;  
    }
}