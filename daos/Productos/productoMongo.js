import  manejoMongo from '../../utils/manejadorMongo.js'
import { Producto } from '../../models/index.js'

export default class ProductoMongo extends  manejoMongo{
    
    constructor(){
        super(Producto)
    }

    async nuevoProducto(producto){
        try {
         return this.save(producto)
        } catch (error) {
            console.log(error)
            throw Error(error)
        }
        
    }

    async obtenerProducto(id){
        try {
           return this.getById(id)
        } catch (error) {
            console.log(error)
            throw Error(error)
        }
    }
    async obtenerProductos(){
        try {
            return this.getAll()
        } catch (error) {
            console.log(error)
            throw Error(error)
        }
    }
    async actualizarProducto(id,objeto){
        try {
            return this.updateById(id,objeto)
        } catch (error) {
            console.log(error)
            throw Error(error)
        }
      
    }

    async eliminarProducto(id){
        try {
            return this.deleteById(id)
        } catch (error) {
            console.log(error)
            throw Error(error)
        }
    }
    
}

