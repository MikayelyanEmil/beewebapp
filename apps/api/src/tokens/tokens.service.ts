import { Injectable } from '@nestjs/common';
import { Token } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TokensService {
    constructor(private prisma: PrismaService) {}

    async createOrUpdate(refresh_token: string, user_id: string): Promise<Token> {
        return await this.prisma.token.upsert({
            where: {
                user_id
            },
            create: {
                refresh_token,
                user: {
                    connect: { 
                        id: user_id 
                    }
                }
            },
            update: {
                refresh_token
            }
        });
    }
}
