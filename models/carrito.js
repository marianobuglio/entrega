import mongoose from 'mongoose';
const { Schema } = mongoose;

const carritoSchema = new Schema({
    productos:[
        {
            type: Schema.ObjectId,
            ref:'Producto'
        }
    ],
    created:{
        type:Date,
        default:new Date()
    }
});

const Carrito = mongoose.model('Carrito', carritoSchema);

export default Carrito