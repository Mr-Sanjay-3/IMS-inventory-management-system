import express from 'express';
import MongoDB from './config/dbConnection.js';
import dotenv from 'dotenv';
import cors from 'cors'
import authRoutes from './routes/auth.routes.js';
import Product from './routes/product.routes.js';
import Stock from './routes/stockMovement.routes.js';
import Category  from './routes/category.route.js';
import Supplier from './routes/suppllier.routes.js';
//alert Route
import StockAlert from './routes/alert.routes.js';
//
import AdminRoute from './routes/status.routes.js';
import Employees from './routes/employee.route.js';
import Logout from './routes/logout.routes.js';
import CheckAdmin from './routes/checkAdmin.routes.js';

dotenv.config()
MongoDB();

//Cors Setup 
const app = express()
app.use(
    cors({
    origin : 'http://localhost:5173',
    credentials: true ,
})
);
// express Connetion :) 

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/admin', AdminRoute);
app.use('/api/check', CheckAdmin);
app.use('/api/product', Product);
app.use('/api/stock', Stock );
app.use('/api/category', Category );
app.use('/api/supplier', Supplier);
app.use('/api/alert', StockAlert);
app.use('/api', Logout);
app.use('/api/employee', Employees);

app.use((req, res,next)=>{
    success:false,
    res.status(404).json({msg:"Not found",
         success: false,
        message: "API route not found",
        path: req.originalUrl,
    })
});


//Server Extablishment 
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server Running on Port:${PORT}`)
    console.log('Exit Server Press Key Ctrl + C')
})