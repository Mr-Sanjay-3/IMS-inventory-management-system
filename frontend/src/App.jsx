import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './components/loginAndRegister.jsx';
import ProtuctedRouter from './components/ProtuctRoute.jsx';
import Dashboard from './pages/adminDashBoard.jsx';
import NotFound from './Subcomponents/notFoundPage.jsx';

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
<Dashboard />
  </ProtuctedRouter> 
 }


/>
<Route path ="*" element={<NotFound />} />

 </Routes>
 </BrowserRouter>



   </>
  )
}

export default App