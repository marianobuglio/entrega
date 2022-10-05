
const manejoArchivos = require('../utils/manejoArchivo.js')
const Producto = require('./producto.js')
class Carrito {
    
    constructor(){
        this.archivo = new manejoArchivos('./DB/Carritos.json')
        this.producto = new Producto()
    }

    async nuevoCarrito(){
        try {
            this.id = await this.archivo.save({timestamp:new Date(),productos:[]})
            return {"id":this.id}
        } catch (error) {
            console.log(error)
            throw Error(error)
        }
        
    }

    async obtenerProductosCarrito(id){
        try {
           const Carrito =  await this.archivo.getById(id)
           console.log(Carrito)
           return Carrito.productos
        } catch (error) {
            console.log(error)
            throw Error(error)
        }
    }
    async insertarProducto(idCarrito,idProducto){
        try {
            const producto = await this.producto.obtenerProducto(idProducto)
            if(producto){
               let  carrito = await this.archivo.getById(idCarrito)
               if(carrito){
                carrito.productos.push(producto)
                await this.archivo.updateById(idCarrito,carrito)
                return {correcto:"Carrito actulizado"}
               }else{
                return {error:"No existe el carrito"}
               }
            }else{
                return {error:"No existe el producto"}
            }
        } catch (error) {
            console.log(error)
            throw Error(error)
        }
    }
    async actualizarCarrito(id,objeto){
        try {
            const respuesta = await this.archivo.updateById(id,objeto)
            return respuesta
        } catch (error) {
            console.log(error)
            throw Error(error)
        }
      
    }

    async eliminarCarrito(id){
        try {
            const respuesta = await this.archivo.deleteById(id)
            return respuesta
        } catch (error) {
            console.log(error)
            throw Error(error)
        }
    }
    


    async eliminarProducto(idCarrito,idProducto){
        try {
            
               let  carrito = await this.archivo.getById(idCarrito)
               if(carrito){
                const existe = carrito.productos.map((obj) => obj.id).indexOf(idProducto) 
                if(existe !== -1){
                    carrito.productos.splice(existe,1)
                    await this.archivo.updateById(idCarrito,carrito)
                    return {correcto:"Producto ELiminado"}
                }else{
                    return {error:"No existe el producto en el carrito"}
                }
               }else{
                return {error:"No existe el carrito"}
               }
           
        } catch (error) {
            console.log(error)
            throw Error(error)
        }
    }
}

module.exports = Carrito