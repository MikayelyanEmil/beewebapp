import { Body, Controller, Post, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private configService: ConfigService
    ) { }

    @Post('signup')
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true })) // "cleans" incoming client data
    async signup(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
        const { access_token, refresh_token } = await this.authService.signup(createUserDto);
        res.cookie('refresh_token', refresh_token, { maxAge: this.configService.get('COOKIE_MAX_AGE'), httpOnly: true, sameSite: "none", secure: true });
        res.status(200).json({ access_token });
    }

    @Post('login')
    async login() {

    }

    @Post('logout')
    async logout() {

    }
}
