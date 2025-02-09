import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Workspace } from '@prisma/client';
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

    async createOrSuggest(createWorkspaceDto: CreateWorkspaceDto, slug: string, user_id: string): Promise<Workspace | string> {
        const workspace = await this.prisma.workspace.findFirst({ where: { slug }});
        if (workspace) return `${workspace.slug}${Math.floor(Math.random() * 100)}`;

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

    async getAll(user_id): Promise<Workspace[]> {
        return await this.prisma.workspace.findMany({
            where: {
                user_id
            },
            orderBy: {
                updated_at: 'desc'
            }
        });
    }

    async checkAndSuggest(slug: string, user_id: string): Promise<string | null> {
        const workspace = await this.prisma.workspace.findFirst({ where: { slug }});
        if (workspace) return `${workspace.slug}${Math.floor(Math.random() * 100)}`;
        return null;
    }
}
