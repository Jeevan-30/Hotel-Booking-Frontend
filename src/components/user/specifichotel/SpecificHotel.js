import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../header/Header';
import './SpecificHotel.css';
import { Carousel } from 'react-bootstrap';
import Footer from '../../Footer/Footer';

export default function SpecificHotel() {
    const navigate = useNavigate();
    const { hid } = useParams();
    const [hotelData, setHotelData] = useState({});
    const [roomData, setRoomData] = useState([]);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showRoom, setShowRoom] = useState(false);
    const [rating, setRating] = useState(1)
    const [avgRating,setAverageRating]= useState(5);

    const fetchRating = async (hid) => {
        try {
            const res = await axios.get(`https://hotel-backend-3.onrender.com/avgrating/${hid}`);
            setAverageRating(res.data.averageRating); 
        } catch (error) {
            console.error('Error fetching average rating:', error);
        }
    };

    useEffect(()=>
    {
        fetchRating(hid)
    },[hid])

    const fetchHotel = async (hid) => {
        try {
            const response = await axios.get(`https://hotel-backend-3.onrender.com/hoteldet/${hid}`);
            setHotelData(response.data);
        } catch (err) {
            setError('Failed to fetch hotel details.');
            console.error(err);
        }
    };

    const fetchRoom = async (hid) => {
        try {
            const response = await axios.get(`https://hotel-backend-3.onrender.com/roomdet/${hid}`);
            setCount(response.data.count);
            setRoomData(response.data.rooms);
        } catch (err) {
            setError('Failed to fetch room details.');
            console.error(err);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                await Promise.all([fetchHotel(hid), fetchRoom(hid)]);
            } catch (err) {
                setError('An error occurred while fetching data.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [hid]);

    if (loading) {
        return <p className="text-center">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-danger">{error}</p>;
    }

    const handleBook = (rid) => {
        navigate(`/roombook/${rid}/${hid}/${hotelData.price}/${hotelData.admin}`);
    };

    const handleRatingChange = async (newRating, hotelId) => {
        try {
            const res = await axios.post('https://hotel-backend-3.onrender.com/putrating', { rating: newRating, hotel: hotelId });
            alert('Thanks for rating our hotel!');
            console.log(res.data)
            console.log(`Rating for hotel ${hotelId} is ${newRating}`);
        } catch (error) {
            console.error('Error rating the hotel:', error);
            alert('Sorry, there was a problem submitting your rating. Please try again later.');
        }
    };

    const handleInputChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value) && value >= 1 && value <= 6) {
            setRating(value);
        }
    };

    return (
        <>
            <Header />

            <div className="container my-4">
                {hotelData && (
                    <>
                    
                    <div className="card mb-4 p-4 shadow-sm">
                    <center>
                        <p className="display-5">{hotelData.hotelname}</p>
                        <p className="card-text">Address: {hotelData.address}</p>
                        <p className="card-text text-success"><strong>Rating : {avgRating}/5</strong> </p>
                    </center>
                    </div><Carousel id="main_c" className="text-dark ">
                            <Carousel.Item id="Carousel">
                                <img
                                    className="d-block w-100"
                                    src={`https://hotel-backend-3.onrender.com/${hotelData.room_image1}`}
                                    alt="First slide" />
                            </Carousel.Item>
                            <Carousel.Item id="Carousel">
                                <img
                                    className="d-block w-100"
                                    src={`https://hotel-backend-3.onrender.com/${hotelData.room_image2}`}
                                    alt="Second slide" />
                            </Carousel.Item>
                            <Carousel.Item id="Carousel">
                                <img
                                    className="d-block w-100"
                                    src={`https://hotel-backend-3.onrender.com/${hotelData.room_image3}`}
                                    alt="Second slide" />
                            </Carousel.Item>
                        </Carousel><br />
                        <div className="container mt-5">
                            <div className="row align-items-center">
                                <div className="col-md-8">
                                    <h1 className="mb-4">
                                        <i className="fas fa-star"></i> Rate Us Here:
                                    </h1>
                                    <div className="d-flex align-items-center ms-5">
                                        <input
                                            className="form-control w-25 me-2"
                                            type="number"
                                            name="rating"
                                            value={rating}
                                            onChange={handleInputChange}
                                            min="1"
                                            max="5"
                                        />
                                        <button
                                            className="btn-transparent text-dark"
                                            onClick={() => handleRatingChange(rating, hotelData._id)}
                                            disabled={rating >= 6}
                                        >
                                            <i className="fas fa-thumbs-up me-2"></i> Rate
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
                {count > 0 ? (
                    <>
                        <center><p className="font-weight-bold my-3">Available rooms: {count}</p></center>
                        <button className='btn btn-primary text-light' onClick={() => setShowRoom(!showRoom)}>
                            {showRoom ? 'Hide Rooms' : 'Show Rooms'}
                        </button>
                        <div className='mt-2 bg-dark text-light' id={showRoom ? 'show' : 'dont'}>
                            {roomData.map((room) => (
                                <div key={room._id} className="card mb-2 p-2 shadow-sm bg-dark text-light">
                                    <center><p className="mb-0">Room Number: {room.roomNo}</p></center>
                                    <button
                                        className="btn btn-transparent text-danger mx-5"
                                        onClick={() => handleBook(room._id)}
                                    >
                                        Book
                                    </button>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <center><p className="font-weight-bold">No rooms available</p></center>
                )}
            </div>
            <Footer/>
        </>
    );
}
