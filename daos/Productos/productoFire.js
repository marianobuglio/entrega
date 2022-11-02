import manejoFirebase from '../../utils/manejadorFireBase.js'
import fs from 'fs'
import admin from 'firebase-admin'
const accountService = await fs.promises.readFile(process.env.PATHFIRE)
// const serviceAccount = JSON.parse()
admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(accountService))
});
const db = admin.firestore();

export default class ProductoFire extends  manejoFirebase{
    
    constructor(){
        super(db,'productos')
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

