import { BrowserRouter, Route, Routes } from "react-router"
import Landing from "./components/Pages/Landing"
import Allcards from "./components/Pages/Allcards"

import Dashboard from "./components/Pages/Admin/Dashboard"
import { Signin } from "./components/Pages/Admin/Signin"






const App = ()=>{
  return (

   <BrowserRouter>
   <Routes >
    <Route index  element={<Landing/>}/>
    <Route path="stores" element={<Allcards/>}/>
    <Route path="admin" element={<Dashboard/>}/>
    <Route path="signin" element={<Signin/>}/>



   </Routes>
   </BrowserRouter>

  

  )
}


export default App