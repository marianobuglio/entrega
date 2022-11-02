
import express from 'express'
import router from './router/router.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import admin from 'firebase-admin'
import fs from 'fs'
const app = express()

dotenv.config()

app.use(express.json())


app.use('/api' , router)

app.use(express.urlencoded({extended:true}))
app.use(express.static('assets'))

if(process.env.TIPO == "mongo"){
    mongoose.connect(process.env.URLDB).then(() => {
        console.info('Connected to MongoDB');
        app.listen(8080, ()=> {
            console.log("corriendo")
        })
      });
}else{
   
    app.listen(8080, ()=> {
        console.log("corriendo")
    })
   
}




