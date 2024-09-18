import { api } from "../lib/api"

export interface Login {
    email: string
    password: string
}

export interface UserData  extends Login {
    name?: string
}

export class UserService {
    static async login(auth: Login){
        const response = await api.post('auth/login', auth)

        return response.data
    }

    static async register(user: UserData){
        const response = await api.post('user/register', user)

        return response.data
    }

    static async findOne(email: string){
        const response = await api.get(`user/?email=${email}`)
        return response.data
    }

    static async updateUser(id: number, user: UserData) {
        const response = await api.patch(`/${id}`, user)

        return response.data
    }
 
}