import { Body, Controller, Post, Req, Res, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { PrismaClientExceptionFilter } from 'src/prisma-client-exception/prisma-client-exception.filter';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private configService: ConfigService,
        private userService: UsersService
    ) { }

    @Post('signup')
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true })) // "cleans" incoming client data
    @UseFilters(PrismaClientExceptionFilter) // each email is unique in db. Catches related errors.
    async signup(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
        const { id, email } = await this.userService.create(createUserDto);
        const { access_token, refresh_token } = await this.authService.authenticate({ sub: id, email });
        res.cookie('refresh_token', refresh_token, { maxAge: this.configService.get('COOKIE_MAX_AGE'), httpOnly: true });
        res.status(200).json({ access_token });
    }

    @Post('login')
    async login(@Req() req, @Res() res) {
        const { access_token, refresh_token } = await this.authService.authenticate({ sub: '869823f6-9f88-44ee-9755-cc8b28f1defd', email: 'test2@aa.com' })
        res.cookie('refresh_token', refresh_token, { maxAge: this.configService.get('COOKIE_MAX_AGE'), httpOnly: true });
        res.status(200).json({ access_token });
    }

    @Post('logout')
    async logout() {

    }
}
