import { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./HotelsPage.css"
import Header from "../../header/Header"
import Footer from "../../Footer/Footer"


export default function HotelsPage() {
    const navigate=useNavigate()
    const { location } = useParams();
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchData = async (location) => {
        try {
            const res = await axios.get(`https://hotel-backend-3.onrender.com/userhotels/${location}`);
            setHotels(res.data);
        } catch (err) {
            setError('Failed to fetch hotels. Please try again later.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(location);
    }, [location]); 

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    const handleDetails=(hid)=>
    {
        navigate(`/specifichotel/${hid}`)
    }

    return (
        <><Header /><div>
            <center><p className='text-dark display-5 mt-3'>Hotels in {location}</p></center>
            {hotels.length === 0 ? (
                <p>No hotels found in {location}.</p>
            ) : (
                hotels.map((hotel) => (
                    <div key={hotel._id} className="hotel-card bg-transparent">
                        <button className='btn' onClick={() => handleDetails(hotel._id)}>
                            <img id='images' src={`https://hotel-backend-3.onrender.com/${hotel.image}`} alt={hotel.hotelname} className="hotel-image" />
                            <h3>{hotel.hotelname}</h3>
                            <p className='text-danger'>Per Day : Rs.{hotel.price}</p>
                        </button>
                    </div>
                ))
            )}
        </div>
        <Footer/>
        </>
    );
}
