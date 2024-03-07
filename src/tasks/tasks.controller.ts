import { Controller, Post, Body, Get, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {

    constructor(private  tasksService: TasksService) {} 

    @Get()
    getTasks(): Promise<Task[]>{
     return this.tasksService.getTasks();
    }

    @Post()
    createTask(@Body() newTask: CreateTaskDto) :  Promise<Task> {
       return this.tasksService.createTask(newTask);
    }

    @Get(':id')
    getTask(@Param('id', ParseIntPipe) id: number) : Promise<Task> {
      return  this.tasksService.getTask(id);
    }

    @Delete(':id')
    deleteTask(@Param('id', ParseIntPipe) id:number) {
       return this.tasksService.deleteTask(id)
    }


}
