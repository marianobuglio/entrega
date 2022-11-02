import express from 'express'
const router = express.Router()
import MiddleWare from '../middlewares/middlewares.js'
import daos from '../daos/index.js'

// import Producto from '../daos/Productos/productoMongo'
let producto 

//inicia la config de dao
(async ()=> {
   const {productoDao} = await daos()
    producto = productoDao
    console.log(producto)
})()
router.get("/:id?",async (req,res)=>{
    // lista uno o todos los productos
    try {
        
        if(req.params.id){
            const respuesta = await producto.obtenerProducto(req.params.id)
            res.send(respuesta)
        }else{
            const respuesta = await producto.obtenerProductos()
            res.send(respuesta)
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({error:"Ocurrio un error"})
    }
})

router.post("",MiddleWare.isAdmin,async (req,res)=>{
    // crea productos en listado
    try {
 
    
    const id = await producto.nuevoProducto(req.body)
    res.send({id})
    } catch (error) {
        console.log(error)
        res.status(500).send({error:"Ocurrio un error"})
    }
    
})

router.put("/:id",MiddleWare.isAdmin,async (req,res)=>{
    // actualiza productos en listado
    try {
        
        const respuesta = await producto.actualizarProducto(req.params.id,req.body)
        res.send(respuesta)
    } catch (error) {
        console.log(error)
        res.status(500).send({error:"Ocurrio un error"})
    }
   
})

router.delete("/:id",MiddleWare.isAdmin,async (req,res)=>{
    // elimina productos en listado
    try {
        
        const respuesta = await producto.eliminarProducto(req.params.id)
        res.send(respuesta)
    } catch (error) {
        console.log(error)
        res.status(500).send({error:"Ocurrio un error"})
    }
})
export default router