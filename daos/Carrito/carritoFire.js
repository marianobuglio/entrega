import manejoFirebase from '../../utils/manejadorFireBase.js'
import fs from 'fs'
import admin from 'firebase-admin'

const db = admin.firestore();

export default class CarritoFire extends  manejoFirebase{
    
    constructor(){
        super(db,'carritos')
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
           const carrito =  await this.getById(id)
           if(!carrito){
            return {message:"no existe carrito con ese id"}
           }
           return carrito.productos
        } catch (error) {
            console.log(error)
            throw Error(error)
        }
    }
    async insertarProducto(idCarrito,idProducto){
        try {
            let carrito =  await this.getById(idCarrito)
            if(!carrito){
                return {message:"no existe carrito con ese id"}
            }
            carrito.productos.push(idProducto)
            return this.updateById(idCarrito,carrito)
        } catch (error) {
            console.log(error)
            throw Error(error)
        }
    }
    
    async eliminarProducto(idCarrito,idProducto){
        try {
            let carrito =  await this.getById(idCarrito)
            if(!carrito){
                return {message:"no existe carrito con ese id"}
            }
            const indexProducto = carrito.productos.map( p => p).indexOf(idProducto)
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
    async eliminarCarrito(id){
        try {
            return this.deleteById(id)
        } catch (error) {
            console.log(error)
            throw Error(error)
        }
    }
    
}

