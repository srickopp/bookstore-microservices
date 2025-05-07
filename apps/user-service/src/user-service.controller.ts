import { Controller } from '@nestjs/common';
import { UserService } from './user-service.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserDto } from './dto/user.dto';

@Controller()
export class UserServiceController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'get-all-users' })
  async getAllUsers() {
    return this.userService.findAll();
  }

  @MessagePattern({ cmd: 'create-user' })
  async createUser(createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @MessagePattern({ cmd: 'get-user-by-id' })
  async getUserById(userId: string) {
    return this.userService.findById(userId);
  }

  @MessagePattern({ cmd: 'get-user-by-email' })
  async getUserByEmail(email: string) {
    return this.userService.findOneByEmail(email);
  }
}
