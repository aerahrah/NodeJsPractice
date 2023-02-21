const express = require('express');
const app = express();
const connectDB = require('./db/connect');
console.log('04 Store API');

require('dotenv').config();
const productRouter = require('./routes/products');


//routes
app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
  });

app.use('api/v1/products', productRouter);
port = 3000;

const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, ()=>{
            console.log(`Server is listening to port ${port}....`);
        });
    } catch (error) {
        console.log(error)
    }
}

start();