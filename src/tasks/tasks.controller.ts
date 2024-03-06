import { Controller, Post, Body } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {

    constructor(private  tasksService: TasksService) {} // In

    @Post()
    createTask(@Body() newTask: CreateTaskDto) {

       return this.tasksService.createTask(newTask);
    }
}
