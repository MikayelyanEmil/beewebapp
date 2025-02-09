import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard';

@Controller('workspaces')
export class WorkspacesController {
    constructor(

    ) { }

    @Post('create')
    @UseGuards(JwtAccessGuard)
    async create(@Req() req: Request, @Res() res: Response) {
        res.json({ data: req.user });
    }
}
