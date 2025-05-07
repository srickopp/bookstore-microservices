import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/user.dto';
import { User, UserDocument } from './schema/user.schema';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userModel.findOne({
      email: createUserDto.email,
    });

    if (existingUser) {
      throw new RpcException('User already exists');
    }

    const createdUser = new this.userModel({
      ...createUserDto,
      _id: new Types.ObjectId(),
    });
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find({}, { password: 0, __v: 0 }).exec();
  }

  async findById(userId: string): Promise<User | null> {
    return this.userModel
      .findById(new Types.ObjectId(userId), {
        password: 0,
        __v: 0,
      })
      .exec();
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.userModel
      .findOne(
        {
          email,
        },
        {
          password: 0,
          __v: 0,
        },
      )
      .exec();
  }
}
