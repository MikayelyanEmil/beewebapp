import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async create(data: Prisma.UserCreateInput): Promise<User> {
        const password = bcrypt.hashSync(data.password, 10);
        return await this.prisma.user.create({
            data: { ...data, password }
        });
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.prisma.user.findUnique({
            where: {
                email
            }
        });
    }

    async saveRefreshToken(refresh_token: string, user_id: string): Promise<void> {
        await this.prisma.token.upsert({
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
