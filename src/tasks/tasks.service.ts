import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto'
import { updateTaskDto } from './dto/update-task.dto';


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

    async getTask(id: number) {
       const taskFound = await  this.taskRepository.findOne({
            where: { id },
        });
        if(!taskFound) {
            return new HttpException('Task not found', HttpStatus.NOT_FOUND)
        }
        return taskFound ;
    }

    async deleteTask(id: number) {
       const taskFound = await this.taskRepository.findOne({ where:{id} });
       if(!taskFound) {
        return new HttpException('Task not found', HttpStatus.NOT_FOUND)
        }
        return this.taskRepository.delete({id});
    }

    async updateTask(id: number, task: updateTaskDto) {
      const taskFound = await this.taskRepository.findOne({where:{id}});
      if(!taskFound) {
        return new HttpException('Task not found', HttpStatus.NOT_FOUND)
      }

      const updateTask = Object.assign(taskFound, task);
      return this.taskRepository.save(updateTask)
    }
}
