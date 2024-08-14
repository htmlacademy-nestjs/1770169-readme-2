import { ConflictException, Injectable } from '@nestjs/common';

import dayjs from 'dayjs';

import { UserRepository } from '../user/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { createMessage } from '@project/lib/shared/helpers';
import { ErrorMessage } from './auth.constant';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  public async registerUser(dto: CreateUserDto): Promise<UserEntity> {
    const user = {
      username: dto.username,
      email: dto.email,
      password: '',
      createdDate: dayjs().toDate(),
      avatar: dto.avatar
    }
    const existUser = this.userRepository.findByEmail(dto.email);

    if(existUser) {
      throw new ConflictException(createMessage(ErrorMessage.USER_EXISTS_MESSAGE, [dto.email]));
    }
    const userEntity = new UserEntity(user).setPassword(dto.password);

    return this.userRepository.save(userEntity);
  }

  public async verifyUser(dto: CreateUserDto): Promise<UserEntity> {
    const existUser = await this.userRepository.findByEmail(dto.email);

    if(!existUser) {
      throw new ConflictException(createMessage(ErrorMessage.NOT_FOUND_MESSAGE, [dto.email]));
    }
    const isMatch = await existUser.comparePassword(dto.password);

    if(!isMatch) {
      throw new ConflictException(ErrorMessage.WRONG_PASSWORD_MESSAGE);
    }

    return existUser;
  }

  public async getUser(id: string): Promise<UserEntity> {
    return this.userRepository.findById(id);
  }
}
