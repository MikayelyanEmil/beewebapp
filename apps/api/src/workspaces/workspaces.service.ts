import { Injectable } from '@nestjs/common';
import { Prisma, Workspace } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';


@Injectable()
export class WorkspacesService {
    constructor(
        private prisma: PrismaService
    ) { }

    async create(createWorkspaceDto: CreateWorkspaceDto, user_id: string): Promise<Workspace> {
        return await this.prisma.workspace.create({
            data: {
                ...createWorkspaceDto,
                user_id
                // user: {
                //     connect: {
                //         id: user_id
                //     }
                // }
            }
        });
    }
}
