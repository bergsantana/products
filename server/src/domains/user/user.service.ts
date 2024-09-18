import { Injectable, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user/user.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/models/product/product.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const userToSave = this.userRepository.create(createUserDto)
    return await this.userRepository.save(userToSave);
  }

  @UseGuards(AuthGuard)
  async findOne(email: string){
    console.log('email', email)
    const res =  await this.userRepository.findOneOrFail({
      where: {
        email
      }})
    console.log('Res', res)
    return res
  }
 
  @UseGuards(AuthGuard)
  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }
 
}
