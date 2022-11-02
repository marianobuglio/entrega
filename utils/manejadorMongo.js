

export default class manejoMongo {
    constructor(Schema){ // schema: Producto , Carrito 
        this.schema = Schema
    }

    async save(objeto){
        //Recibe un objeto, lo guarda en el archivo,devuelve id
        try {
            const Objeto = new  this.schema(objeto)
            const newProducto = await Objeto.save()
            return newProducto._id
        } catch (error) {
            throw error
        }

    }

    async getById(id,populate){
        // recibe un id, devuelve el objeto con ese id, sino null
        try {
            const objeto = await this.schema.findOne({_id:id}).populate(populate)
            if(!objeto){
                return {message:"No existe el objeto"}
            }
            return objeto
        } catch (error) {
            throw error
        }
   
    }
    async updateById(id,objeto){
        // actualiza datos por id
        try {
            const objetoAntiguo = await this.schema.findOne({_id:id})
            if(!objetoAntiguo){
                return {message:"No existe el objeto"}
            }
            const nuevoObjeto = Object.assign(objetoAntiguo,objeto)
            await nuevoObjeto.save()
            return nuevoObjeto
        } catch (error) {
            console.log(error)
            throw error
        }
        
    }
    async getAll(){
        //devuelve todos los objetos
        try {
            const objetos = await this.schema.find({})
            if(objetos.length <= 0){
                return {message:"No existen objetos"}
            }
            return objetos
        } catch (error) {
            throw error
        }
    }

    async deleteById(id){
        //Elimina el objeto por el id
        try {
            const objeto = await this.schema.findOne({_id:id})
            if(!objeto){
                return {message:"No existe el objeto"}
            }
            await this.schema.remove({_id:id})
            return {message:"Objeto eliminado correctamente"}
        } catch (error) {
            throw error
        }
    }

    async deleteAll(){
        //elimina todos los objetos del archivo
        try {
         this.schema.remove({})
         return {message:"Productos eliminados correctamente"}
        } catch (error) {
            throw error
        }


    }

}


