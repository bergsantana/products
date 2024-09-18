import { api, useBearerToken } from "../lib/api"

export interface Product {
    name: string
    description: string
    price: number
    expireDate: Date
    image: string
    categoryName: string
    id?: number
}

 

export class ProductService {
 

    static beforeFetch = () => {
        const token = localStorage.getItem('token')
        return token
    }
    static async create(product: Product){
        
        const response = await api.post('product', product, {
            headers: {
                Authorization: `Bearer ${this.beforeFetch()}`
            }
        })

        return response.data
    }

    static async paginatedFindProducts(search: string, page: number)   {
        const response = await api.get(`/product/?search=${search}&page=${page}`, {
            headers: {
                Authorization: `Bearer ${this.beforeFetch()}`
            }
        })
        return response.data as  {
            data: Product[]
            count: number
            page: string
            pageSize: number
        } 
    }

    static async update(product: Product){
        const response = await api.patch('/product', product,{
            headers: {
                Authorization: `Bearer ${this.beforeFetch()}`
            }
        })
        return response.data
    }

    static async delete(id: number ) {
        const response = await api.delete(`/product/${id}`,{
            headers: {
                Authorization: `Bearer ${this.beforeFetch()}`
            }
        })
        return response.data

    }
}