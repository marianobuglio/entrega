
const manejoArchivos = require('../utils/manejoArchivo.js')

class Producto {
    
    constructor(){
        this.archivo = new manejoArchivos('./DB/productos.json')
    }

    async nuevoProducto(nombre,descripcion,codigo,foto,precio,stock){
        try {
            this.nombre = nombre
            this.descripcion = descripcion
            this.codigo = codigo
            this.foto = foto
            this.precio = precio
            this.stock = stock
            this.id = await this.archivo.save({nombre:this.nombre,descripcion:this.descripcion,codigo:this.codigo,
            foto:this.foto,precio:this.precio,stock:this.stock
            })
            return this.id
        } catch (error) {
            console.log(error)
            throw Error(error)
        }
        
    }

    async obtenerProducto(id){
        try {
           const producto =  await this.archivo.getById(id)
           console.log(producto)
           return producto
        } catch (error) {
            console.log(error)
            throw Error(error)
        }
    }
    async obtenerProductos(){
        try {
           const producto =  await this.archivo.getAll()
           console.log(producto)
           return producto
        } catch (error) {
            console.log(error)
            throw Error(error)
        }
    }
    async actualizarProducto(id,objeto){
        try {
            const respuesta = await this.archivo.updateById(id,objeto)
            return respuesta
        } catch (error) {
            console.log(error)
            throw Error(error)
        }
      
    }

    async eliminarProducto(id){
        try {
            const respuesta = await this.archivo.deleteById(id)
            return respuesta
        } catch (error) {
            console.log(error)
            throw Error(error)
        }
    }
    
}

module.exports = Producto