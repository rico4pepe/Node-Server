import * as dotenv from 'dotenv'

import express from "express";
import path from 'path'
import {fileURLToPath} from 'url';
import RootRouter from './routes/route.js'
import cookieParser  from "cookie-parser";
import cors from 'cors'
//import { errorHandler } from "./middleware/errorHandler.js";
import {logger} from "./middleware/logger.js"
//import redis from 'redis'
import corsOption from "./config/corsOption.js";
import connectDB from './config/connectDB.js'
import mongoose from 'mongoose';
import userRouter from "./routes/userRoutes.js"
import  authRouter from './routes/authRoutes.js'



dotenv.config({ debug: true })
console.log(process.env.NODE_ENV)

connectDB();

//let redisClient;


const app = express();

const prefix = "/api/tech"; 
const authPrefix =  "/api/tech/auth"; 


const port = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);


app.use(logger )




app.use(cors(corsOption))
app.use(express.json())
app.use(cookieParser())
//creatin middleware for static folders which will be accesible by all
app.use('/', express.static('public'))
//explicitly creating the middle ware above
//app.use('/', express.static(path.join(__dirname,  'public')))


app.use(authPrefix, authRouter);
app.use(prefix, userRouter); //http://localhost:5000/api/stackOverflow/allusers


app.use('/', RootRouter)

// app.get('/', (req, res)=> {
//     res.send("Hello Express"); 
// });

//Test all routes and check for html response this should be down the last route checking

app.all('*', (req, res)=>{
    res.status(404)
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    }else if(req.accepts('json')){
        res.json({message: '404 not found'})
    }else{
        res.type('txt').send('404 not found')
    }
})

//app.use(errorHandler)  
mongoose.connection.once('open', ()=>{
    console.log("Connected to MongoBB")
    app.listen(port, () => console.log(`Listening on locahost: ${port}`));

})

mongoose.connection.on('error', err=>{
    console.log(err)
})
