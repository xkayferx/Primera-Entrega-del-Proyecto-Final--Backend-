const Container = require('./container')
const isNumber = require('is-number');

const productsContainer = new Container()

const getProducts = async (req, res) => {
    const verProductos= await productsContainer.getAll()
    res.json(verProductos)
}

const postProductos = async (req, res) => {
    const {title, description, code, price, thumbnail, timestamp, stock} = req.body 
    const elemento = await productsContainer.newProduct(title, description, code, price, thumbnail, timestamp, stock)
    res.json(elemento)
}

const getProductId = async (req, res) => {
    const id = Number(req.params.id)
    if(!isNumber(id)){return res.json({ error: "El parámetro no es un número" })}
    const elemento = await productsContainer.getById(id)
    if(!elemento.length){return res.status(404).json({error: "Producto no encontrado"})}
    res.json(elemento)
}

const putProduct = async (req, res) => {
    const {title, description, code, price, thumbnail, timestamp, stock} = req.body
    const id = Number(req.params.id)
    if(!isNumber(id)){return res.json({ error: "El parámetro no es un número" })}
    const elemento = await productsContainer.getById(id)
    if(!elemento.length){return res.status(404).json({error: "Producto no encontrado"})}
    const elementChanged = await productsContainer.update(id,title, description, code, price, thumbnail, timestamp, stock)
    res.json(elementChanged)
    
}

const deleteProduct = async (req, res) => {
    const id = Number(req.params.id)
    if(!isNumber(id)|| !id){return res.json({ error: "El parámetro no es un número o el id no existe" })}
    await productsContainer.deleteById(id)
    res.json(await productsContainer.getAll())
}

module.exports = {
    getProducts,
    postProductos,
    getProductId,
    putProduct,
    deleteProduct,
    productsContainer
}