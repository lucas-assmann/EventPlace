import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma.module';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from './auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthGuard } from './auth/auth.guard';
import { PrismaService } from './prisma.service';
import { EventModule } from './event/event.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    PrismaModule,
    HttpModule,
    AuthModule,
    ScheduleModule.forRoot(),
    EventModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
