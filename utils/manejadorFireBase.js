

export default class manejoFirebase {
    constructor(db,coleccion){ // schema: Producto , Carrito 
        this.db = db
        this.coleccion = coleccion
    }

    async save(objeto){
        //Recibe un objeto, lo guarda en el archivo,devuelve id
        try {
            const newCarrito = await this.db.collection(this.coleccion).doc()
            const id = newCarrito.id; 
            await newCarrito.set(objeto);
            return id
        } catch (error) {
            console.log(error)
            throw error
        }

    }

    async getById(id){
        // recibe un id, devuelve el objeto con ese id, sino null
        try {
            console.log(id)
            const doc =  this.db.collection(this.coleccion).doc(id);

            const item = await doc.get()
            console.log(item.data())
            if(!item){
                return {message:"No existe el objeto"}
            }
            return  item.data();
        } catch (error) {
            throw error
        }
   
    }
    async updateById(id,objeto){
        // actualiza datos por id
        try {
            const document = this.db.collection(this.coleccion).doc(id);
            await document.update(objeto);
            return {message:"Objeto Actualizado"}
        } catch (error) {
            console.log(error)
            throw error
        }
        
    }
    async getAll(){
        //devuelve todos los objetos
        try {
            const snapshot = await this.db.collection(this.coleccion).get()
            return snapshot.docs.map(doc => doc.data());
        } catch (error) {
            throw error
        }
    }

    async deleteById(id){
        //Elimina el objeto por el id
        try {
            const doc = this.db.collection(this.coleccion).doc(id);
            await doc.delete();
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


