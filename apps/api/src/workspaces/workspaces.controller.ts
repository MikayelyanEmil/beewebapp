import { Body, Controller, Delete, ForbiddenException, Get, HttpStatus, Param, Post, Put, Req, Res, UseFilters, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard';
import { WorkspacesService } from './workspaces.service';
import { JWTPayload } from 'src/auth/interfaces/jwt-payload';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { PrismaClientExceptionFilter } from 'src/prisma-client-exception/prisma-client-exception.filter';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';


@Controller('workspaces')
@UseGuards(JwtAccessGuard)
@UseFilters(PrismaClientExceptionFilter)
export class WorkspacesController {
    constructor(
        private workspacesService: WorkspacesService
    ) { }

    @Get(':slug')
    async read(@Param('slug') slug: string, @Req() req: Request, @Res() res: Response) {
        const workspace = await this.workspacesService.read(slug); 
        if (workspace.user_id !=  (req.user as JWTPayload).sub) throw new ForbiddenException('Not allowed to read');
        res.status(HttpStatus.OK).json({ workspace });
    }

    @Post(':slug')
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
    async create(@Body() createWorkspaceDto: CreateWorkspaceDto, @Param('slug') slug: string, @Req() req: Request, @Res() res: Response) {
        const workspace = await this.workspacesService.create(createWorkspaceDto, slug, (req.user as JWTPayload).sub);
        res.status(HttpStatus.CREATED).json({ workspace });
    }

    @Put(':slug')
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
    async update(@Body() updateWorkspaceDto: UpdateWorkspaceDto, @Param('slug') slug: string, @Req() req: Request, @Res() res: Response) {
        const workspace = await this.workspacesService.update(updateWorkspaceDto, slug, (req.user as JWTPayload).sub);
        res.status(HttpStatus.OK).json({ workspace });
    }

    @Delete(':slug')
    async delete(@Param('slug') slug: string, @Req() req: Request, @Res() res: Response) {
        const workspace = await this.workspacesService.delete(slug, (req.user as JWTPayload).sub); 
        res.status(HttpStatus.OK).json({ workspace });
    }
}
