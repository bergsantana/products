import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<import("../../models/user/user.entity").User>;
    findOne(query: {
        email: string;
    }): Promise<import("../../models/user/user.entity").User>;
    update(id: string, updateUserDto: UpdateUserDto): string;
}
