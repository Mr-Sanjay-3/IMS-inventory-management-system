import express from 'express';
import MongoDB from './config/dbConnection.js';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import Product from './routes/Product.routes.js';
import Stock from './routes/stockMovement.routes.js';
import Category  from './routes/category.route.js';
import Supplier from './routes/suppllier.routes.js';
import Alert from './routes/alert.routes.js';

dotenv.config()
MongoDB();


// express Connetion :) 
const app = express()
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/product', Product);
app.use('/api/stock', Stock );
app.use('/api/category', Category );
app.use('/api/supplier', Supplier);
app.use('/api/alert', Alert)

//Server Extablishment 
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server Running on Port:${PORT}`)
    console.log('Exit Server Press Key Ctrl + C')
})