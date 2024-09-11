import Header from "../../header/Header";
import image1 from "../../../images/home1.jpg";
import image2 from "../../../images/home2.jpg";
import image3 from "../../../images/home3.jpg";
import star from "../../../images/5star.jpg";
import budget from "../../../images/budget.jpg";
import luxury from "../../../images/luxury.jpg"
import { Carousel } from 'react-bootstrap';
import "./Uhome.css";

export default function Uhome() {
    return (
        <>
            <Header />
            <div id="body">
            <div className="content-container my-2 text-center">
                <h1 className="title">Welcome to our website</h1>
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
            <div  className="text my-4">
            <center><h1 id="caption">Discover Your Perfect Stay: Luxurious Comfort Awaits</h1></center>
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
            </div>
            <footer className="bg-dark p-4">
                <p className="text-center text-light">Copyright 2024. All rights reserved.</p>
            </footer>
        </>
    );
}
