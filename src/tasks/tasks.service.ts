import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
    constructor(@InjectRepository(Task) private taskRepository: Repository<Task>) {}

    createTask(task) {
        const newTask = this.taskRepository.create(task);
        return this.taskRepository.save(newTask);
    }
}
