const { Router } = require('express');
const router = Router()
const { getProducts, postProductos, getProductId, putProduct,deleteProduct} = require('../controllers/productsController')
const { postCart, deleteCart, watchCart, insertProductoByIdToCart, deleteProductCart} = require('../controllers/cartController')

//Rutas Productos
router.get('/productos', getProducts)
router.get('/productos/:id', getProductId)

//Rutas Carrito
router.post('/carrito', postCart) 
router.delete('/carrito/:id', deleteCart )
router.get('/carrito/:id/productos', watchCart)
router.post('/carrito/:id/productos', insertProductoByIdToCart)
router.delete('/carrito/:id/productos/:id_prod', deleteProductCart)

const auth = (req, res, next)=>{
    const admin = true
    if(admin) {return next()} 
    else {
        let mensajeError={
            error : "-1",
            descripcion: `ruta: ${req.url} método: ${req.method} no autorizado`
        }
        res.status(401).json( mensajeError)
    }
}

//Rutas Productos (ADMIN)

router.post('/productos',auth, postProductos)
router.put('/productos/:id',auth, putProduct)
router.delete('/productos/:id',auth, deleteProduct )

module.exports = router