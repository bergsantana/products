import { JwtService } from '@nestjs/jwt';
import { User } from 'src/models/user/user.entity';
import { Repository } from 'typeorm';
export declare class AuthService {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    login(email: string, password: string): Promise<string>;
}
