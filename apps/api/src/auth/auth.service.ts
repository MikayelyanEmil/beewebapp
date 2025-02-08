import { Injectable } from '@nestjs/common';
import { AuthTokens } from './interfaces/auth-tokens';
import { CreateUserDto } from './dto/create-user.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private configService: ConfigService
    ) { }

    async signup(createUserDto: CreateUserDto): Promise<AuthTokens> {
        const access_token = createUserDto.email, refresh_token = createUserDto.full_name;
        return {
            access_token,
            refresh_token
        }
    }
}
