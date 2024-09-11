import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "./UserDashboard.css"
import Header from "../../header/Header"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSearch } from '@fortawesome/free-solid-svg-icons';
import { Carousel } from 'react-bootstrap';
import image1 from "../../../images/home1.jpg";
import image2 from "../../../images/home2.jpg";
import image3 from "../../../images/home3.jpg";
import star from "../../../images/5star.jpg";
import budget from "../../../images/budget.jpg";
import luxury from "../../../images/luxury.jpg"


export default function UserDashboard() {
    const navigate = useNavigate()
    const { username } = useParams();
    const [location, setLocation] = useState('');

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    };

    const handleHotels = () => {
        navigate(`/hotelspage/${location}`)
    }

    return (
        <><div>
            <Header />
            <div id='name'>
                <center><p className="mb-4 display-5 text-secondary">Welcome, {username}!</p></center>
            </div>
            <center>
                <div id='form'>

                    <select
                        id="location"
                        className="form-control"
                        value={location}
                        onChange={handleLocationChange}
                    >
                        <option value="">Select a location</option>
                        <option value="ooty">Ooty</option>
                        <option value="kodaikanal">Kodaikanal</option>
                        <option value="coimbatore">Coimbatore</option>
                    </select>

                </div>
            </center>
            {location && (
                <>
                    <center>
                        <div className="mt-3">

                            <button className='btn bg-transparent text-success' onClick={handleHotels}>
                                <FontAwesomeIcon icon={faSearch} /> Search Hotels
                            </button>
                        </div>
                    </center>
                </>
            )}
        </div>
        <div className="content-container my-2 text-center">
                <h1 className="title">search your location to view hotels</h1>
                <p className="description">In pursuit of unparalleled luxury experiences</p>
            </div>
            <div id="images" className="my-4">
                <Carousel id="back_images" className="text-dark">
                    <Carousel.Item id="Carousel1">
                        <img
                            className="d-block w-100"
                            src={image1}
                            alt="First slide" />
                    </Carousel.Item>
                    <Carousel.Item id="Carousel1">
                        <img
                            className="d-block w-100"
                            src={image2}
                            alt="Second slide" />
                    </Carousel.Item>
                    <Carousel.Item id="Carousel1">
                        <img
                            className="d-block w-100"
                            src={image3}
                            alt="Third slide" />
                    </Carousel.Item>
                </Carousel>
            </div>
            <div  className="text-center my-4">
                <center><h1 id='caption'>Discover Your Perfect Stay: Luxurious Comfort Awaits</h1></center>
                <div id="hotels" className="d-flex flex-wrap justify-content-center">
                
                    <div className="card mx-2 my-2" style={{ width: "18rem" }}>
                        <img src={luxury} className="card-img-top" alt="Service 1" />
                        <div className="card-body">
                            <h5 className="card-title">luxury hotels</h5>
                        </div>
                    </div>
                    <div className="card mx-2 my-2" style={{ width: "18rem" }}>
                        <img src={budget} className="card-img-top" alt="Service 2" />
                        <div className="card-body">
                            <h5 className="card-title">budget hotels</h5>
                        </div>
                    </div>
                    <div className="card mx-2 my-2" style={{ width: "18rem" }}>
                        <img src={star} className="card-img-top" alt="Service 3" />
                        <div className="card-body">
                            <h5 className="card-title">5 star hotels</h5>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="bg-dark p-4">
                <p className="text-center text-light">Copyright 2024. All rights reserved.</p>
            </footer>
         </>
    );
}
