import { AuthenticationModule } from '@authentication/authentication.module';
import { ApplicationMiddleware } from '@authentication/middlewares/application/application.middleware';
import { AuthMiddleware } from '@authentication/middlewares/auth.middleware';
import { CoreModule } from '@core/core.module';
import { HttpModule } from '@nestjs/axios';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProspectModule } from '@prospect/prospect.module';
import { UsersController } from '@users/controllers/users.controller';
import { UsersModule } from '@users/users.module';
import { FirebaseModule } from 'nestjs-firebase';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnswersModule } from './modules/answers/answers.module';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FirebaseModule.forRoot({
      googleApplicationCredential: './firebase.json',
      storageBucket: 'gs://kot-academy.appspot.com',
    }),
    CoreModule,
    AuthenticationModule,
    UsersModule,
    ProspectModule,
    AnswersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware, ApplicationMiddleware)
      .forRoutes(UsersController);
  }
}
