import { storedProduct } from './storedProduct'

export interface cart {
    cartId: number
    timestamp: string
    products: storedProduct[]
}