require('dotenv').config();
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';

const ps = process.env.MYSQLPS;
const ho = process.env.HOST;
const us = process.env.USER;
const database = process.env.DATABASE;



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: `${ho}`,
      port: 16080,
      username: 'avnadmin',
      password: `${ps}`,
      database: `${database}`,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false, 
    }),
    UsersModule,
    TasksModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
 