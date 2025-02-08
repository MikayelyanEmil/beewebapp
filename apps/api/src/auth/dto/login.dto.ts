import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto {
    @IsEmail({}, { message: 'Please enter valid email address.' })
    email: string;

    @IsNotEmpty({message: 'Invalid password, try again.'})
    password: string;
}