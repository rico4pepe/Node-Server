import express from "express";
import path from 'path'
import {fileURLToPath} from 'url';
import RootRouter from './routes/route.js'

const app = express();

const port = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);


//creatin middleware for static folders which will be accesible by all
app.use('/', express.static('public'))
//explicitly creating the middle ware above
//app.use('/', express.static(path.join(__dirname,  'public')))

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
app.listen(port, () => console.log(`Listening on locahost: ${port}`));
