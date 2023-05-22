import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import '../styles/App.css';
import Main from "../pages/Main"
import Restaurantes from "../pages/Restaurantes"
import Zo from "../pages/restaurantsPages/Zo"
import Aboutus from "../pages/Aboutus";
import NotFound from "../pages/NotFound"
import SignIn from "../components/auth/SignIn";
import SignUp from "../components/auth/SignUp";
import { UserAuth } from "../components/auth/AuthContext";
import { ProtectorRuta } from "../components/auth/ProtectorRuta";

export function MyRoutes(){
  const {authUser} = UserAuth();
  const RequireAuth = ({children})=>{
    return authUser ? children: <Navigate to={"/login"}/>
  }

  return(
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Main/>}/>
        <Route exact path="/login" element={<SignIn/>}/>
        <Route exact path="/register" element={<SignUp/>}/>
        <Route exact path="/restaurants" element={

            <Restaurantes/>
    
        }/>
        <Route exact path="/restaurants/zo" element={

          <Zo/>

        }/>
        <Route exact path="/aboutus" element={<Aboutus/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}

