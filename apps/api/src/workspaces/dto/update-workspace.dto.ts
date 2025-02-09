import { IsNotEmpty } from "class-validator";

export class UpdateWorkspaceDto {
    @IsNotEmpty({ message: 'Specify correct name please.' })
    name: string;
}