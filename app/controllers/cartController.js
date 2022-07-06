const CartContainer = require('./cartContainer')
const Container = require('./container')
const isNumber = require('is-number');
const { productsContainer } = require('./productsController')

const carts = new CartContainer()

const postCart = async (req, res)=>{
    const elemento = await carts.newCart()
    res.json(elemento)
}

const watchCart = async (req, res) => {
    const id = Number(req.params.id)
    if(!isNumber(id)){return res.json({ error: "El parámetro no es un número" })}
    const elemento = await carts.getCartById(id)
    if(!elemento.length){return res.status(404).json({error: "Carrito no encontrado"})}
    res.json(elemento)
}

const deleteCart = async (req, res) => {
    const id = Number(req.params.id)
    const elemento = await carts.getCartById(id)
    if(!elemento.length){return res.status(404).json({error: "Carrito no encontrado"})}
    if(!isNumber(id)){return res.json({ error: "El parámetro no es un número o el id no existe" })}
    await carts.deleteCartById(id)
    res.json(await carts.getAllCarts())
}

const insertProductoByIdToCart = async (req,res)=>{
    const id_cart=Number(req.params.id)
    const {id} = req.body 
    console.log("imprimo id_cart",id_cart)
    const elemento = await carts.getCartById(id_cart)
    if(!elemento.length){return res.status(404).json({error: "Carrito no encontrado"})}
    console.log("imprimo id_prod",id)
    const productInsert= await productsContainer.getById(id)
    const item=productInsert[0]
    console.log("imprimo prod",item) 
    if(!isNumber(id_cart)){return res.json({ error: "El parámetro no es un número o el id no existe" })}
    if(!isNumber(id)|| productInsert.length==0){return res.json({ error: "El producto no existe" })}
    res.json(await carts.insertProductById(id_cart,item))
}
const deleteProductCart = async (req, res)=>{
    const id=Number(req.params.id)
    const id_prod= Number(req.params.id_prod)
    const productdelete= await productsContainer.getById(id_prod)
    if(!isNumber(id)){return res.json({ error: "El parámetro no es un número o el id no existe" })}
    if(!isNumber(id_prod)|| productdelete.length==0){return res.json({ error: "El producto no existe" })}
    res.json(await carts.deleteProductofCartById(id,id_prod))  
}

module.exports = { 
    postCart, 
    deleteCart, 
    watchCart, 
    insertProductoByIdToCart,
    deleteProductCart
}