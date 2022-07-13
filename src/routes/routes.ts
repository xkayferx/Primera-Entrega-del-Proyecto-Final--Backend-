import { Router } from "express";
const router = Router()
import {getAll, getById, addProduct, updateProductById, deleteProductById} from '../controllers/productsControllers'
import { cartCreate, cartDelete, getProductsByCartId, addToCartById, deleteProductByCartId } from '../controllers/cartControllers'


router.get("/products", getAll)
router.get("/products/:id", getById)
router.post("/products", addProduct)
router.put("/products/:id", updateProductById)
router.delete("/products/:id", deleteProductById)
router.post('/cart', cartCreate)
router.delete('/cart/:id', cartDelete)
router.get('/cart/:id/products', getProductsByCartId)
router.post('/cart/:id/products', addToCartById)
router.delete('/cart/:id/products/:id_prod', deleteProductByCartId)

export default router