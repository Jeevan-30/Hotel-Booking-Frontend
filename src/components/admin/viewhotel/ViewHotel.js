import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import Header from "../../header/Header";
import Footer from "../../Footer/Footer";

export default function ViewHotel() {
    const navigate = useNavigate();
    const { hid } = useParams();
    const [hotel, setHotel] = useState({});
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');


    const fetchHotel = async (hid) => {
        try {
            const res = await axios.get(`https://hotel-backend-3.onrender.com/gethoteldata/${hid}`);
            setHotel(res.data);
        } catch (error) {
            setError("Error fetching hotel data");
            console.error("Error fetching hotel data:", error);
        }
    };

    const fetchRooms = async (hid) => {
        try {
            const res = await axios.get(`https://hotel-backend-3.onrender.com/getrooms/${hid}`);
            setRooms(res.data.rooms);
        } catch (error) {
            setError("Error fetching room data");
            console.error("Error fetching room data:", error);
        }
    };

    

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                await Promise.all([
                    fetchHotel(hid),
                ]);
            } catch (error) {
                setError('Failed to fetch data.');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [hid]);

    useEffect(()=>
    {
        fetchRooms(hid)
    },[hid])

    const handleRoom = () => {
        navigate(`/addroom/${hid}`);
    };

    const handleBookings = () => {
        navigate(`/bookings/${hid}`)
    };

    if (loading) {
        return <p className="text-center">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-danger">{error}</p>;
    }

    const handleClick=async(rid)=>
    {
         const res= await axios.get(`https://hotel-backend-3.onrender.com/changeroom/${rid}`)
         console.lod(res.data)
    }

    return (
        <>
            <Header />
            <div className="container mt-4">
                {hotel && (
                    <div className="card view-hotel-card">
                        <img 
                            src={`https://hotel-backend-3.onrender.com/${hotel.image}`} 
                            alt={hotel.hotelname} 
                            className="card-img-top view-hotel-img" 
                        />
                        <div className="card-body">
                            <h1 className="card-title">{hotel.hotelname}</h1>
                            <h2 className="card-subtitle mb-2 text-muted">{hotel.address}</h2>
                            <p className="card-text"><strong>Price:</strong> Rs. {hotel.price} Per day</p>
                            <button className="btn btn-light text-success" onClick={handleBookings}>View Bookings</button>
                        </div>
                        <button className="btn btn-dark text-light" onClick={handleRoom}>Add Rooms</button>
                    </div>
                )}
                <div>
                    {rooms.length > 0 ? (
                        rooms.map(room => (
                            <div key={room.id} className="card view-room-card mt-3">
                                <div className="card-body">
                                    <h1 className="card-title">Room No: {room.roomNo}</h1>
                                    <h2>Status: {room.status}</h2>
                                    <button className="bg-danger text-light" onClick={()=>handleClick(room._id)}>available</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No rooms available.</p>
                    )}
                </div>
            </div>
            <Footer/>
        </>
    );
}
