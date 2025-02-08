import { Body, Controller, Post, Req, Res, UseFilters, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response, Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { PrismaClientExceptionFilter } from 'src/prisma-client-exception/prisma-client-exception.filter';
import { UsersService } from 'src/users/users.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JWTPayload } from './interfaces/jwt-payload';
import { TokensService } from 'src/tokens/tokens.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private configService: ConfigService,
        private userService: UsersService,
        private tokensService: TokensService
    ) { }

    @Post('signup')
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true })) // "cleans" incoming client data
    @UseFilters(PrismaClientExceptionFilter) // each email is unique in db. Catches related errors.
    async signup(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
        const { id, email } = await this.userService.create(createUserDto);
        const { access_token, refresh_token } = await this.authService.generateTokens({ sub: id, email });
        res.cookie('refresh_token', refresh_token, { maxAge: this.configService.get('COOKIE_MAX_AGE'), httpOnly: true });
        res.status(200).json({ access_token });
    }

    @Post('login')
    @UseGuards(LocalAuthGuard)
    async login(@Req() req: Request, @Res() res: Response) {
        const { access_token, refresh_token } = await this.authService.generateTokens(req.user as JWTPayload)
        res.cookie('refresh_token', refresh_token, { maxAge: this.configService.get('COOKIE_MAX_AGE'), httpOnly: true });
        res.status(200).json({ access_token });
    }

    @Post('logout')
    async logout(@Req() req: Request, @Res() res: Response) {
        await this.tokensService.delete(req.cookies.refresh_token);
        res.clearCookie('refresh_token');
        res.sendStatus(200);
    }
}
