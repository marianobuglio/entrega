import express from 'express'
const router = express.Router()
// import Carrito from '../daos/Carrito/carritoMongo.js'
import daos from '../daos/index.js'
let carrito 

(async ()=> {
    const {carritoDao} = await daos()
     carrito = carritoDao
     console.log(carrito)
 })()
router.post("",async (req,res)=>{
    //crea carrito y devuelve id
    try {
        const respuesta = await carrito.nuevoCarrito()
        res.send(respuesta)
    } catch (error) {
        res.status(500).send({error:"ocurrio un error"})
    }
})
router.get("/:id/productos",async(req,res)=>{
    // lista todos los productos de un carrito
    try {
        console.log("id",req.params.id)
        const respuesta = await carrito.obtenerProductosCarrito(req.params.id)
        res.send(respuesta)
    } catch (error) {
        res.status(500).send({error:"ocurrio un error"})
    }
})
router.post("/:id/productos",async (req,res)=>{
    // ingresa producto en carrito por id
    try {
        const idProducto = req.body.idProducto
        const respuesta = await carrito.insertarProducto(req.params.id,idProducto)
        res.send(respuesta)
    } catch (error) {
        res.status(500).send({error:"ocurrio un error"})
    }
})

router.delete("/:id/productos/:id_prod",async (req,res)=>{
    // elimina productos y lo elimina
    try {
        const respuesta = await carrito.eliminarProducto(req.params.id,req.params.id_prod)
        res.send(respuesta)
    } catch (error) {
        res.status(500).send({error:"ocurrio un error"})
    }
})
router.delete("/:id",async (req,res)=>{
    // elimina carrito
    try {
        
        const respuesta = await carrito.eliminarCarrito(req.params.id)
        res.send(respuesta)
    } catch (error) {
        res.status(500).send({error:"ocurrio un error"})
    }
})

export default router