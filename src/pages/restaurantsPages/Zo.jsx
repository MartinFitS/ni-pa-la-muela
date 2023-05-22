import React, {useState, useEffect} from "react";
import NavBar from "../../components/NavBar";
import PlatilloImgIzq from "../../components/PlatilloImgIzq";
import Footer from "../../components/Footer"
import Comments from "../../components/Comments";
import ShowComments from "../../components/ShowComments";
import {db} from "../../firebase"
import { collection,getDocs } from "firebase/firestore"; 
import "../../styles/zo.css"

const Zo = () => {
    const url = "http://localhost:4000/api/restaurants"
    const urlReviews = "http://localhost:4000/api/reviews"
    const [restaurants, setRestaurants] = useState();
    const [reviews, setReviews] = useState();
    const [showCommentsState, setShowCommentsState] = useState();

    const fetchApi = async () => {
        const response = await fetch(url);
        const responseReview = await fetch(urlReviews);
        const responseJSON = await response.json();
        const responseReviewJSON = await responseReview.json();
        setRestaurants(responseJSON)
        setReviews(responseReviewJSON)
    }

    const dataComments = async() => {
        const dataComment = await getDocs(collection(db, "comments"));
        const commentsFilter = [];
        dataComment.forEach((doc) =>{
            commentsFilter.push({id: doc.id, ...doc.data()})
        });
        setShowCommentsState(commentsFilter)
    }
    useEffect(()=>{
        fetchApi();
        dataComments();
    },[])


    let areThereRestaurants = !restaurants;
    let areThereReviews = !reviews;
    let areThereComments = !showCommentsState

    let filterDataZo = areThereRestaurants === false ? restaurants.filter((i)=>{
        return i.nameRestaurant.toLowerCase() === "zo sushi & pizza"
    }): [];

    let filterReviewZo = areThereReviews === false ? reviews.filter((i) => {
        return i.restaurant === "zoo"
    }): [];

    let filterCommentsZo = areThereComments === false ? showCommentsState.filter((i)=> {
        return i.restaurant === "zoo"
    }): []



    return(
        <React.Fragment>
            <NavBar/>
            <div className="divBlog">
        
                <div className="topPartPage">
                    
                    {
                            areThereRestaurants === false?
                            <h1>{filterDataZo[0].nameRestaurant}</h1>:
                            <h2>No llega nada perquin</h2>
                    }
                    {
                            areThereRestaurants === false?
                            <p>{filterDataZo[0].shortDescriptionRestaurant}</p>:
                            <p>Esperando...</p>
                    }


                    <div className="imagen"><img src={
                        areThereRestaurants === false?
                        filterDataZo[0].photoOfRestaurant:
                        0
                    } alt=""/></div>
                </div>

                <div className="resena">
                    {
                        areThereReviews !== true ?
                        filterReviewZo.map(i=>
                            <PlatilloImgIzq	
                                key = {i._id}
                                {...i}
                            />
                        ):<h1>No hay datos</h1>

                    }
                </div>

                <div className="ubicationDiv">
                    
                {
                    areThereRestaurants === false ?
                    <iframe src={filterDataZo[0].ubicationRestaurant} width="600" height="450"  loading="lazy" ></iframe>:
                    []

                }
                <div className="textUbication">
                <h3 className="titleUbicationH3">¿Donde puedes encontrarlos?</h3>
                {
                    areThereRestaurants === false ?
                    <p>Sin duda hemos quedado fascinados con este bello restaurant llamado <span>{filterDataZo[0].nameRestaurant}</span>, te dejamos un mapa el cual puedes utilizarlo para llegar a comer en el.</p>:[]
                }
                
                </div>
                
                </div>
            </div>
            <Comments/>
            <div className="showCommentsDiv" id="#my-section">
                {
                    areThereComments !==true ? 
                    <h1>Comentarios</h1>: []
                }
                        {
                            areThereComments !== true ? 
                                filterCommentsZo.map(i => 
                                    <ShowComments
                                        key = {i.id}
                                        {...i}
                                    />
                                    ):<h1>Registrate para ver que opina la gente.</h1>
                        }
            </div>


            <Footer/>
        </React.Fragment>
    )
}

export default Zo