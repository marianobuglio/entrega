import  manejoMongo from '../../utils/manejadorMongo.js'
import { Carrito } from '../../models/index.js'

export default class CarritoMongo extends  manejoMongo{
    
    constructor(){
        super(Carrito)
    }

    async nuevoCarrito(){
        try {
            return this.save({productos:[]})
        } catch (error) {
            console.log(error)
            throw Error(error)
        }
        
    }

    async obtenerProductosCarrito(id){
        try {
            const carrito = await this.getById(id,"productos")
            if(carrito){
                return carrito.productos
            }
        } catch (error) {
            console.log(error)
            throw Error(error)
        }
    }
    async insertarProducto(idCarrito,idProducto){
        try {
            let carrito = await this.getById(idCarrito)
            if(!carrito){
                return {message:"No existe carrito"}
            }
            carrito.productos.push(idProducto)
            return this.updateById(idCarrito,carrito)
        } catch (error) {
            console.log(error)
            throw Error(error)
        }
    }
    async actualizarCarrito(id,objeto){
        try {
          
        } catch (error) {
            console.log(error)
            throw Error(error)
        }
      
    }

    async eliminarCarrito(id){
        try {
            return this.deleteById(id)
        } catch (error) {
            console.log(error)
            throw Error(error)
        }
    }
    


    async eliminarProducto(idCarrito,idProducto){
        try {
            let carrito = await this.getById(idCarrito)
            if(!carrito){
                return {message:"No existe carrito"}
            }
            const indexProducto = carrito.productos.map( p => p._id.toString()).indexOf(idProducto)
            if(indexProducto == -1){
                return {message:"No existe ese producto en el carrito"}
            }
            carrito.productos.splice(indexProducto,1)

            return this.updateById(idCarrito,carrito)
            
           
        } catch (error) {
            console.log(error)
            throw Error(error)
        }
    }
}

