import { signInWithEmailAndPassword } from "firebase/auth";
import React, {useState} from "react";
import {auth} from "../../firebase"
import "../../styles/signIn.css"
import { useNavigate } from "react-router-dom";

const ErrorPass = () => {
    return(
        <div className="errorDiv">
            <p className="textError">Usuario y/o contraseña incorrectos. Por favor, inténtalo de nuevo.</p>
        </div>
    )
}

const SignIn = () => {
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState(""); 
    const [error, setError] = useState(null);
    const navigate = useNavigate()

    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email,password)
        .then((userCredentials)=>{
            console.log(userCredentials)
            navigate("/")
        }).catch((error) => {
            if(error.code == "auth/wrong-password"){
                setError("Usuario y/o contraseña incorrectos. Por favor, inténtalo de nuevo.");
                console.log("la contraseña es incorrecta")
            }
        })

    }
    return(
        <div className="sign-in_container">
            <div className="imgLogin"></div>
            <div className="formSignIn">
                <form onSubmit={signIn}>
                <h1>Login</h1>
                <div className="i_userName">
                <input 
                    type="text" 
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Email" 
                    value={email}/>
                </div>
                
                <div className="i_pass">
                <input 
                    value={password} 
                    type="password" 
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"/>
                </div>

                <div className="textLogin">
                <p>¿No tienes una cuenta? <span><a href="/register">REGISTRATE</a></span></p>
                </div>
                
                    <button type="submit">Acceder</button>
                    {error && <ErrorPass/>} {/* Agregar mensaje de error si existe */}
                </form>

            </div>

        </div>
    )
}

export default SignIn;