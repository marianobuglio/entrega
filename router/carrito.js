const express = require('express')
const router = express.Router()
const Carrito = require('../models/carrito.js')
let carrito = new Carrito()


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
        
        const respuesta = await carrito.obtenerProductosCarrito(parseInt(req.params.id))
        res.send(respuesta)
    } catch (error) {
        res.status(500).send({error:"ocurrio un error"})
    }
})
router.post("/:id/productos",async (req,res)=>{
    // ingresa producto en carrito por id
    try {
        const idProducto = req.body.idProducto
        const respuesta = await carrito.insertarProducto(parseInt(req.params.id),idProducto)
        res.send(respuesta)
    } catch (error) {
        res.status(500).send({error:"ocurrio un error"})
    }
})

router.delete("/:id/productos/:id_prod",async (req,res)=>{
    // elimina productos y lo elimina
    try {
        
        const respuesta = await carrito.eliminarProducto(parseInt(req.params.id),parseInt(req.params.id_prod))
        res.send(respuesta)
    } catch (error) {
        res.status(500).send({error:"ocurrio un error"})
    }
})
router.delete("/:id",async (req,res)=>{
    // elimina carrito
    try {
        
        const respuesta = await carrito.eliminarCarrito(parseInt(req.params.id))
        res.send(respuesta)
    } catch (error) {
        res.status(500).send({error:"ocurrio un error"})
    }
})

module.exports = router