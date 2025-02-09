import { Body, Controller, HttpStatus, Param, Post, Req, Res, UseFilters, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard';
import { WorkspacesService } from './workspaces.service';
import { JWTPayload } from 'src/auth/interfaces/jwt-payload';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { PrismaClientExceptionFilter } from 'src/prisma-client-exception/prisma-client-exception.filter';


@Controller('workspaces')
@UseGuards(JwtAccessGuard)
export class WorkspacesController {
    constructor(
        private workspacesService: WorkspacesService
    ) { }

    @Post('create')
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
    @UseFilters(PrismaClientExceptionFilter)
    async create(@Body() createWorkspaceDto: CreateWorkspaceDto, @Req() req: Request, @Res() res: Response) {
        const workspace = await this.workspacesService.create(createWorkspaceDto, (req.user as JWTPayload).sub);
        res.status(HttpStatus.CREATED).json({ workspace });
    }
}
