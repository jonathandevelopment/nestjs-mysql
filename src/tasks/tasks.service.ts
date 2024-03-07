import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto'


@Injectable()
export class TasksService {
    
    constructor(@InjectRepository(Task) private taskRepository: Repository<Task>) {}

    createTask(task: CreateTaskDto) {
        const newTask = this.taskRepository.create(task);
        return this.taskRepository.save(newTask);
    }

    getTasks(){
        return this.taskRepository.find()
    }

    getTask(id: number) {
       return  this.taskRepository.findOne({
            where: { id },
        })
    }

    deleteTask(id: number) {
       return this.taskRepository.delete({ id });
    }
}
