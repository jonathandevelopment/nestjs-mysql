import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto'
import { updateTaskDto } from './dto/update-task.dto';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class TasksService {
    
    constructor(@InjectRepository(Task) private taskRepository: Repository<Task>,
        private usersService: UsersService
    ) {}

    async createTask(task: CreateTaskDto) {
        const userFound = await this.usersService.getUser(task.authorId);
        if(!userFound) {
            return new HttpException('Task not found', HttpStatus.NOT_FOUND)
        }

        const newTask = this.taskRepository.create(task);
        return this.taskRepository.save(newTask);
    }


    getTasks(){
        return this.taskRepository.find({
            relations: ['author']
        })
    }

    async getTask(id: number) {
       
        return this.taskRepository.find() ;
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
