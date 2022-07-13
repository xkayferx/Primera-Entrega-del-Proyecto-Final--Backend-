import { product } from './product'

export interface storedProduct extends product {
    id: number
    timestamp: string
}