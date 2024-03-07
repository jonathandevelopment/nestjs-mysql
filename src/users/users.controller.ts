import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateUserDto  } from './dto/create-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private  userService: UsersService) {} 

    @Post()
    createUser(@Body() newUser: CreateUserDto) : Promise<User> {
        return this.userService.createUser(newUser);
    }

    @Get()
    getUsers(): Promise<User[]> {
      return  this.userService.getUsers()
    }

    @Get(':id')
    getUser(@Param('id', ParseIntPipe) id:number) {
        return this.userService.getUser(id)
    }

    @Patch( ':id' )
    updateUser(
      @Param('id') id:number, 
      @Body() updatedUser: UpdateUserDto) {
        return this.userService.updateUser(id,updatedUser)
    }
}
