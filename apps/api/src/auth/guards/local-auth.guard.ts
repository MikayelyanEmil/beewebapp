import { BadRequestException, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from '../dto/login.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';


@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
    async canActivate(context: ExecutionContext): Promise<any> {
        const request = context.switchToHttp().getRequest();
        const body = plainToInstance(LoginDto, request.body);

        const errors = await validate(body);
        const errorMessages = errors.flatMap(({ constraints }) =>
            Object.values(constraints!),
        );

        if (errorMessages.length > 0) {
            throw new BadRequestException(errorMessages);
        }

        return await super.canActivate(context);
    }
}

