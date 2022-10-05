const express = require('express')
const router = express.Router()

const carrito = require('./carrito.js')
const productos = require('./productos.js')

router.use("/carrito",carrito)
router.use("/productos",productos)

module.exports = router