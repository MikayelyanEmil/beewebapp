import { IsNotEmpty } from "class-validator";

export class CreateWorkspaceDto {
    @IsNotEmpty({ message: 'Specify correct name please.' })
    name: string;
}