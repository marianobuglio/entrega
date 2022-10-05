
const fs = require('fs');
class manejoArchivos {
    constructor(path){
        this.path = path
    }

    async save(objeto){
        //Recibe un objeto, lo guarda en el archivo,devuelve id
        try {
            const db = await this.#readAndParse()
            console.log(db)
            if(db){
                const newId = db.length > 0 ? db[db.length - 1].id + 1 : db.length
                objeto.id = newId
                db.push(objeto)
                await this.#writeFile(db)
                return newId
            }
        } catch (error) {
            throw error
        }

    }

    async getById(id){
        // recibe un id, devuelve el objeto con ese id, sino null
        try {
            const db = await this.#readAndParse()
            const existe = db.map(object => object.id).indexOf(id)
            console.log("existe",existe)
            return existe !== -1 ? db[existe] : null
        } catch (error) {
            throw error
        }
   
    }
    async updateById(id,objeto){
        try {
           let db = await this.#readAndParse()
           if(db.length > 0){
            const existe = db.map(object => object.id).indexOf(id)
            if(existe !== -1){
                objeto.id = id
                db[existe] = objeto
                await this.#writeFile(db)
                return {correcto:"Producto actualizado con exito"}
            }else{
                return {error:"El producto no existe"}
            }
            
           }else{
            return {error:"no hay productos"}
           }
        } catch (error) {
            console.log(error)
            throw error
        }
        
    }
    async getAll(){
        //devuelve todos los objetos
        try {
            const db = await this.#readAndParse()
            if(db){
                return db
            }
        } catch (error) {
            throw error
        }
    }

    async deleteById(id){
        //Elimina el objeto por el id
        try {
            let db = await this.#readAndParse()
            if(db){
                const existe = db.map((obj) => obj.id).indexOf(id) 
                if(existe !== -1){
                    db.splice(existe,1)
                    await this.#writeFile(db)
                    return {correcto:"Eliminado con exito"}
                }else{
                    return {error:"El producto no existe"}
                }
            }
        } catch (error) {
            throw error
        }
    }

    async deleteAll(){
        //elimina todos los objetos del archivo
        try {
            await this.#writeFile([])
            return "Todos los objetos eliminados con exito"
        } catch (error) {
            throw error
        }


    }


     #readAndParse(){
        const promise = new Promise((resolve,reject) => {
            fs.readFile(this.path,(err,DB)=>{
                if(err){
                   reject({message:'ocurrio un error al leer el archivo',err})
                }else{
                    resolve(JSON.parse(DB.toString()))
                }
            })
        })
        return promise

    }

    #writeFile(newDB){
        const promise = new Promise((resolve,reject) => {
            fs.writeFile(this.path,JSON.stringify(newDB),(err,DB)=>{
                if(err){
                   reject({message:"Ocurrio un error al escribir la base",err})
                }
                resolve("Guardado con exito")
            })
        })

        return promise

    }
}

module.exports = manejoArchivos

