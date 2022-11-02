import mongoose from 'mongoose';
const { Schema } = mongoose;

const productoSchema = new Schema({
    nombre:{
        type:String,
        required:"Ingrese un nombre"
    },
    descripcion:{
        type:String,
        required:"Ingrese descripcion"
    },
    codigo:{
        type:Number,
        required:"Ingrese un Codigo"
    },
    foto:{
        type:String
    },
    precio:{
        type:Number,
        required:"Ingrese un precio"
    },
    stock:{
        type:Number,
        required:"Ingrese un stock"
    },
    created:{
        type:Date,
        default:new Date()
    }
});

const Producto = mongoose.model('Producto', productoSchema);

export default Producto