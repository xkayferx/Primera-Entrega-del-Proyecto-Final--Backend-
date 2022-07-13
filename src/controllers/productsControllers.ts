import { Request, Response } from "express";
import productsContainer from '../container/productsContainer'

export const getAll = async(req: Request, res: Response) => {
    const products = await productsContainer.getAll()
    
    res.json(products)
}

export const getById = async(req: Request, res: Response) => {
    const { id } = req.params
    const body = await productsContainer.getById(Number(id))
    
    res.json(body)
}

export const addProduct = async(req: Request, res: Response) => {
    const product = req.body

    const storedProduct =  await productsContainer.addProduct(product)
    res.json(storedProduct)
}

export const updateProductById = async(req: Request, res: Response) => {
    const { id } = req.params
    const product = req.body
    
    await productsContainer.updateProductById(Number(id), product)
    res.json({msg: `Product ${id} updated.`})
}

export const deleteProductById = async (req: Request, res: Response) => {
    const { id } = req.params
    const deletedProduct = await productsContainer.deleteProductById(Number(id))

    res.json({
        deletedProduct
    })
}