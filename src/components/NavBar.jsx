import React from "react";
import "../styles/Navbar.css"
import { UserAuth } from "./auth/AuthContext"
const NavBar = () => {
    const {authUser,userSignOut} = UserAuth()
    return(
        <React.Fragment>
                <div className="navbarOutIndex">
                    <div className="logoNavbar">
                        <a href="/">
                            Ni pa la muela
                        </a>
                    </div>
                    <div className="optionsNavbar">
                        <ul>
                            <li><a href="">About Us</a></li>
                            <li><a href="/aboutus">Contactos</a></li>
                            {authUser != null ? <li className="userHead">Bienvenido {authUser.email}</li> : [] }
                            <li>{authUser != null ? <button className="button_closeSesioninother" onClick={userSignOut}>Cerrar Sesión</button>: <a className="" href="/login">Iniciar Sesion</a>} </li>
                            
                        </ul>
                    </div>
                </div>
        </React.Fragment>
    )
}

export default NavBar