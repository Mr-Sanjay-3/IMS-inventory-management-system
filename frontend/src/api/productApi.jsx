import API from './axios'

//CREATE
export const createProduct = (data)=> 
API.post('/product', data,
    {
        headers: {
            Authorization : `Bearer ${localStorage.getItem('token')}`
        },
    });

//Read Product
export const getProduct =  () =>
    API.get('/category',{ 
        headers :{
     Authorization: `Bearer ${localStorage.getItem("token")}`
 
        },

 });
//Update Product
 
export const updateProduct = (id, data)=> 
    API.put(`/product/${id}`, data, {
    headers : {
Authorization : `Bearer ${localStorage.getItem("token")}`
    },
});

//Delete Product

export const deleteProduct = (id, data) =>
    API.delete( `/product/${id}`, data,
        {
            headers :{
                Authorization : `Bearer ${localStorage.getItem("token")}`
                
            },
        });

//getCategory
export const getCategories = ()=>
    API.get('/category');
