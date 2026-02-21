import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './components/loginAndRegister.jsx';
import ProtuctedRouter from './components/ProtuctRoute.jsx';
import Dashboard from './pages/adminDashBoard.jsx';
import NotFound from './Subcomponents/notFoundPage.jsx';
import ProductPage from './pages/productPage.jsx';
import ProductHistory from './pages/productHistory.jsx';
import GlobalLayout from './layouts/GlobalLayout.jsx';
import AddStaffpage from './pages/AddStaffPage.jsx';
import ListStaff from './pages/staffHistory.jsx';


const App = () => {
  return (
   <>
  
   
 <BrowserRouter >

<Routes>
  <Route path='/' element={<Navigate to={'/login' } replace />} />
<Route path='/login'  element={<Login />} />

<Route
path='/admin' 
element={
  <ProtuctedRouter role={"admin"}>
    <GlobalLayout />
  </ProtuctedRouter> 
 }
>
<Route index element={<Dashboard />} />
<Route path='product' element={<ProductPage />}  />
<Route path='category' element={<ProductHistory />} />
<Route path='addstaff' element={<AddStaffpage />} />
<Route  path='liststaff' element ={<ListStaff />} />
</Route>
<Route path ="*" element={<NotFound />} />

 </Routes>
 </BrowserRouter>
  
 

   </> 

  )
}

export default App