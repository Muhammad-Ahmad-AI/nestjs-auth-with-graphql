import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TaskService } from './task.service';
import { TaskResolver } from './task.resolver';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  providers: [TaskService, TaskResolver],
})
export class TaskModule {}
