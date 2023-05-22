import React, {useState} from "react";
import {db} from "../firebase"
import { collection, addDoc } from "firebase/firestore"; 
import { UserAuth } from "../components/auth/AuthContext"
import { useNavigate } from "react-router-dom";

const Comments =() =>{
    const [textComment, setComment] = useState("")
    const {authUser} = UserAuth()
    const navigate = useNavigate()
    
    const handleSubmit = (e) => {
        e.preventDefault()

        if (authUser !== null){
            addDoc(collection(db, "comments"), {
                comments: textComment, user: authUser.email||"anonimo", restaurant: "zoo" || "anonimo"
            })
            .then(()=>{
                console.log('Document successfully written!');
                window.location.hash = '#';
                window.location.reload()
            })
            .catch((e) =>{
                console.error('Error writing document: ', e);
            })
            setComment("")
        }else{
            navigate("/login")
        }


       
    }

    return(
        <React.Fragment>
            <div className="commentsDiv" >
                <h1>Opiniones</h1>
                <h2>Hola {authUser != null ? <span>{authUser.email} </span>: <a>Anonimo </a>}opina sobre </h2>
                <div className="commentsFor">
                    <form onSubmit={handleSubmit}>
                        <textarea value={textComment}  onChange={(event) => setComment(event.target.value)} name="" id="" cols="30" rows="10"  ></textarea>
                        <button type="submit">Comentar</button>
                    </form>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Comments;