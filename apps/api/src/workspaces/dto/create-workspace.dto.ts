import { IsNotEmpty } from "class-validator";

export class CreateWorkspaceDto {
    @IsNotEmpty({ message: 'Specify correct name please.' })
    name: string;

    @IsNotEmpty({ message: 'Specify correct slug please.' })
    slug: string;
}