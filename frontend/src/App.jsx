import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './components/loginAndRegister.jsx';
import ProtuctedRouter from './components/ProtuctRoute.jsx';
import AdminDashboard from './pages/adminDashBoard.jsx';
import NotFound from './Subcomponents/notFoundPage.jsx';
//ProductManagement 
import ProductPage from './pages/productPage.jsx';
import ProductHistory from './pages/productHistory.jsx';
//Global layout for Nested Routing Operation for NavBar :
import GlobalLayout from './layouts/AdminGlobalLayout.jsx';
//Employees Management Route
import AddStaffpage from './pages/AddStaffPage.jsx';
import ListEmployees from './pages/EmployeesHistory.jsx';
//For Developers About Section :)
import AboutDevelopersPage from './pages/aboutDevelopersPage.jsx';
//Staff Related Routes Import 
import StaffRoute from './components/StaffRoute.jsx';
import StaffGlobalLayout from './layouts/SttaffGlobalLayout.jsx';
import StaffDashboard from './pages/StaffDashboard.jsx';
import StaffProductHistory from './pages/StaffProductHistory.jsx';
import LowStockAert from './pages/LowStockAlertList.jsx';

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
<Route index element={<AdminDashboard />} />
<Route path='product' element={<ProductPage />}  />
<Route path='category' element={<ProductHistory />} />
<Route path='addstaff' element={<AddStaffpage />} />
<Route  path='listEmployees' element ={<ListEmployees />} />
 <Route path='aboutDevelopers' element={<AboutDevelopersPage />} />
 <Route path='alert'  element={<LowStockAert />} />
</Route>

 

<Route>
 <Route 
 path='/staff' 
  element={
  <StaffRoute role={"staff"}>
    <StaffGlobalLayout />
    </StaffRoute>}
 > 
 <Route index element={<StaffDashboard />} />
 <Route path='productlist' element ={<StaffProductHistory />} />
 <Route path='stafflist' element={<ListEmployees />} />
 <Route path='aboutDevelopers' element={<AboutDevelopersPage />} />
</Route>
</Route>
<Route path ="*" element={<NotFound />} />
 </Routes>
 </BrowserRouter>
  
 

   </> 

  )
}

export default App