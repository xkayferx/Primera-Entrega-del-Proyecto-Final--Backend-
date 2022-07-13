import { Request, Response } from 'express'
import cartConatiner from '../container/cartContainer'

export const cartCreate = async (req: Request, res: Response) => {
    const cartId = await cartConatiner.createNewCart()

    if (typeof cartId !== 'number') {
        return res.status(500).json({
            error: -1,
            msg: 'Error creating cart',
            cartId
        })
    } else {
        res.json(cartId)
    }
}

export const cartDelete = async (req: Request, res: Response) => {
    const { id } = req.params
    const cart = await cartConatiner.cartDeleteById(Number(id))

    if (cart instanceof Error) {
        return res.status(500).json({
            error: -1,
            msg: cart.message
        })
    } else {
        if (cart === -1) {
            return res.status(500).json({
                error: -1,
                msg: 'Cart file is empty!'
            })
        } else {
            if (cart === -2){
                return res.status(500).json({
                    error: -2,
                    msg: `There is no cart with id= ${id}`
                })
            } else {
                res.json(`Cart id: ${id} deleted.`)
            }
        }
    }
}

export const getProductsByCartId = async (req: Request, res: Response) => {
    const { id } = req.params
    const cart = await cartConatiner.getProductsByCartId(Number(id))

    if (cart instanceof Error) {
        return res.status(500).json({
            error: -1,
            msg: cart.message
        })
    } else {
        res.json(cart)
    }
}

export const addToCartById = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = req.body
    const cart = await cartConatiner.addToCartById(Number(id), product)

    if (cart instanceof Error) {
        return res.status(500).json({
            error: -1,
            msg: cart.message,
        })
    } else {
        res.json(cart)
    }   
}

export const deleteProductByCartId = async (req: Request, res: Response) => {
    const { id, id_prod } = req.params
    const cart = await cartConatiner.deleteProductByCartId(Number(id), Number(id_prod))

    if (cart instanceof Error) {
        return res.status(500).json({
            error: -1,
            msg: cart.message,
        })
    } else {
        res.json(cart)
    }  
}