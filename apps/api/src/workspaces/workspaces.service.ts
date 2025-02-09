import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Workspace } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';


@Injectable()
export class WorkspacesService {
    constructor(
        private prisma: PrismaService
    ) { }

    async read(slug: string): Promise<Workspace> {
        return await this.prisma.workspace.findFirstOrThrow({ where: { slug } });
    }

    async create(createWorkspaceDto: CreateWorkspaceDto, slug: string, user_id: string): Promise<Workspace> {
        return await this.prisma.workspace.create({
            data: {
                ...createWorkspaceDto,
                user_id,
                slug
            }
        });
    }

    async update(updateWorkspaceDto: UpdateWorkspaceDto, slug: string, user_id: string): Promise<Workspace> {
        const workspace = await this.read(slug);
        if (workspace.user_id != user_id) throw new ForbiddenException('Not allowed to update');
        return await this.prisma.workspace.update({
            where: {
                slug
            },
            data: updateWorkspaceDto
        });
    }

    async delete(slug: string, user_id: string): Promise<Workspace> {
        const workspace = await this.read(slug);
        if (workspace.user_id != user_id) throw new ForbiddenException('Not allowed to delete');
        return await this.prisma.workspace.delete({ where: { slug } });
    }
}
