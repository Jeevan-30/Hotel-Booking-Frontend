import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AdminContext } from '../../AdminContext';
import './Dashboard.css'; 
import Header from "../../header/Header"
import Footer from "../../Footer/Footer"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed } from '@fortawesome/free-solid-svg-icons';


export default function Dashboard() {
    const navigate = useNavigate();
    const { username, id } = useParams();
    const [hotels, setHotels] = useState([]);
    const [error, setError] = useState('');
    const { setAdminId } = useContext(AdminContext);

    useEffect(() => {
        setAdminId(id);
    }, [id, setAdminId]);

    const handleHotel = () => {
        navigate(`/addhotel/${id}`);
    };

    const fetchHotels = async (id) => {
        try {
            const res = await axios.get(`https://hotel-backend-3.onrender.com/hotels/${id}`);
            setHotels(res.data);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch hotels');
        }
    };

    const handleView=(hid)=>
    {
        navigate(`/viewhotel/${hid}/${id}/`)
    }

    useEffect(() => {
        fetchHotels(id);
    }, [id]);

    return (
        <><Header />
        <div className="container mt-4">
            <center>  
            <h1 className="mb-4">{username ? `${username}'s Dashboard` : 'Dashboard'}</h1>
            <button className='btn bg-dark text-light' onClick={handleHotel}>
      <FontAwesomeIcon icon={faBed} /> Add Hotels
    </button> </center>
            <div className="mt-3 mb-4">
                
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="row">
                {hotels && hotels.length > 0 ? (
                    hotels.map((hotel) => (
                        <div key={hotel._id} className="col-md-4 mb-3">
                            <div className="card hotel-card">
                                <img src={`https://hotel-backend-3.onrender.com/${hotel.image}`} alt={hotel.hotelname} className="card-img-top" />
                                <div className="card-body">
                                    <h5 className="card-title">{hotel.hotelname}</h5>
                                    <p className="card-text">{hotel.city}</p>
                                </div>
                                <button className='btn btn-dark text-light' onClick={() => handleView(hotel._id)}>View</button>
                            </div>

                        </div>
                    ))
                ) : (
                    <div className="col-12">
                        <div className="card text-center">
                            <div className="card-body">
                                <h5 className="card-title">You have no hotels</h5>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
        <Footer/>
        </>
    );
}
