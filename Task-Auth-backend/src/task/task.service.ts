import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { TaskInput } from "./dto/input/task-input";

@Injectable()
export class TaskService {
  constructor(private readonly prismaService: PrismaService) {}

  async addTask(data: TaskInput) {
    const task = await this.prismaService.task.create({
      data: { name: data.name },
    });
    if (!task)
      throw new BadRequestException("No tasks created, Something went Wrong!");
    return task;
  }

  async task(id: number) {
    const task = await this.prismaService.task.findFirst({
      where: { id: Number(id) },
    });
    if (!task) throw new BadRequestException("No task exists!");
    return task;
  }

  async tasks() {
    const task = await this.prismaService.task.findMany();    
    if (!task) throw new BadRequestException("No task exists!");
    
    return task;
  }
}
