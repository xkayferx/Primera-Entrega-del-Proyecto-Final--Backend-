const {leer, escribir}= require ('../../src/helpers/help')

class CartContainer{
    constructor(){
        this.carts= [];
    }
    
    async getCartById(id){
        this.carts = await leer('listaCarritos')
        const carrito = this.carts.filter(cart=> cart.id === id)
        console.log(carrito)
        return carrito   
    }

    async getAllCarts(){
        this.carts = await leer('listaCarritos')
        return this.carts
    }

    async deleteCartById(id){
        this.carts = await leer('listaCarritos')
        const objeto = this.carts.filter(item=>item.id!=id)
        this.carts = objeto 
        await escribir('listaCarritos',this.carts)  
    }

    async deleteProductofCartById(id,id_prod){
        this.carts = await leer('listaCarritos')
        const index=this.carts.findIndex(element=>element.id==id)
        const finalCart= this.carts[index].products.filter(item=>item.id!=id_prod)
        console.log(finalCart)
        this.carts[index].products=finalCart
        await escribir('listaCarritos',this.carts) 
    }
    
    async insertProductById(id,productInsert){
        this.carts = await leer('listaCarritos')
        const index=this.carts.findIndex(element=>element.id==id)
        this.carts[index].products.push(productInsert)
        await escribir('listaCarritos',this.carts)  
    }

    async newCart(){
        this.carts = await leer('listaCarritos')
        if(this.carts.length==0){
            const elemento = {
                timestamp:Date.now(), 
                id:1,
                products:[]
            }
            this.carts.push(elemento)
            await escribir('listaCarritos',this.carts)
            return elemento
        }else{
            const lastIndex = this.carts[this.carts.length-1].id
            const Index= lastIndex + 1
            const elemento = {
            timestamp:Date.now(),
            id:Index,
            products:[]
            }
            this.carts.push(elemento)
            await escribir('listaCarritos',this.carts)
            return elemento
        }
    }

}

module.exports= CartContainer