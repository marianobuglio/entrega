import * as dotenv from "dotenv"

dotenv.config()

const daos = {
    mongo: async () => {
        const {default:ProductoMongo} = await import('./Productos/productoMongo.js') 
        const {default:CarritoMongo} = await import('./Carrito/carritoMongo.js') 
        return {
            productoDao : new  ProductoMongo(),
            carritoDao : new CarritoMongo()
        }
    },
    fireBase:async  () => { 
        const {default:ProductoFire} = await import('./Productos/productoFire.js') 
        const {default:CarritoFire} = await import('./Carrito/carritoFire.js') 
       return {
            productoDao : new ProductoFire(),
            carritoDao : new CarritoFire()
        }
    }
}


export default daos[process.env.TIPO]
