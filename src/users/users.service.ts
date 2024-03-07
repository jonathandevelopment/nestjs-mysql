import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto  } from './dto/create-user.dto';
import { UpdateUserDto  } from './dto/update-user.dto';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>){}

    createUser(user: CreateUserDto){
        const newUser = this.userRepository.create(user);
        return this.userRepository.save(newUser);

    }

    getUsers() {
       return this.userRepository.find()
    }

   async getUser(id:number) {
        const userFound = await this.userRepository.findOne({where:{id}});

        if(!userFound) {
            return new HttpException('User not found', HttpStatus.NOT_FOUND)
        }

        return userFound
    }

    async updateUser(id:number, user: UpdateUserDto) {
        const userFound = await this.userRepository.findOne({where:{id}});

        if(!userFound) {
            return new HttpException('User not found', HttpStatus.NOT_FOUND)
        }
        
        return this.userRepository.save(Object.assign(userFound, user));

    }



}
