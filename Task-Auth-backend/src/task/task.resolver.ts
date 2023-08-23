import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { TaskService } from "./task.service";
import { TaskResponse } from "./dto/output/task-response";
import { TaskInput } from "./dto/input/task-input";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";

@Resolver()
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => TaskResponse)
  async createTask(@Args("data") data: TaskInput) {
    return this.taskService.addTask(data);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => TaskResponse)
  async getTask(@Args("id") id: number) {
    return this.taskService.task(id);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [TaskResponse])
  async listTasks() {
    return this.taskService.tasks();
  }
}