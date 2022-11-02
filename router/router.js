import express from 'express'
import carrito from './carrito.js'
import productos from './productos.js'
const router = express.Router()


router.use("/carrito",carrito)
router.use("/productos",productos)

export default   router