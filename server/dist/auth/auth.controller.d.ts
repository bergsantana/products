import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDTO: {
        email: string;
        password: string;
    }): Promise<string>;
}
