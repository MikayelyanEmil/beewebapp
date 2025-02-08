import { Injectable } from '@nestjs/common';
import { Prisma, Workspace } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class WorkspacesService {
    constructor(
        private prisma: PrismaService
    ) {}

    async create(data: Prisma.WorkspaceCreateInput): Promise<any> {

    }
}
