import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TokensModule } from './tokens/tokens.module';
import { WorkspacesModule } from './workspaces/workspaces.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      //envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'frontend', 'out'),
    }),
    AuthModule,
    TokensModule,
    WorkspacesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
