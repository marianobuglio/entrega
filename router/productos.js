const express = require('express')
const router = express.Router()
const Producto = require('../models/producto')
const MiddleWare = require('../middlewares/middlewares.js')
router.get("/:id",async (req,res)=>{
    // lista uno o todos los productos
    try {
        let producto = new Producto()
        console.log(parseInt(req.params.id))
        const respuesta = await producto.obtenerProducto(parseInt(req.params.id))
        res.send(respuesta)
    } catch (error) {
        console.log(error)
        res.status(500).send({error:"Ocurrio un error"})
    }
})

router.post("",MiddleWare.isAdmin,async (req,res)=>{
    // crea productos en listado
    try {
    const nombre = req.body.nombre
    const descripcion = req.body.descripcion
    const codigo = req.body.codigo
    const foto = req.body.foto
    const precio = req.body.precio
    const stock = req.body.stock
    let producto = new Producto()
    const id = await producto.nuevoProducto(nombre,descripcion,codigo,foto,precio,stock)
    res.send({id})
    } catch (error) {
        console.log(error)
        res.status(500).send({error:"Ocurrio un error"})
    }
    
})

router.put("/:id",MiddleWare.isAdmin,async (req,res)=>{
    // actualiza productos en listado
    try {
        let producto = new Producto()
        const respuesta = await producto.actualizarProducto(parseInt(req.params.id),req.body)
        res.send(respuesta)
    } catch (error) {
        console.log(error)
        res.status(500).send({error:"Ocurrio un error"})
    }
   
})

router.delete("/:id",MiddleWare.isAdmin,async (req,res)=>{
    // elimina productos en listado
    try {
        let producto = new Producto()
        const respuesta = await producto.eliminarProducto(parseInt(req.params.id))
        res.send(respuesta)
    } catch (error) {
        console.log(error)
        res.status(500).send({error:"Ocurrio un error"})
    }
})
module.exports = router