import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from "../../header/Header"
import Footer from '../../Footer/Footer';

export default function Hotel() {
    const { id } = useParams();
    const [hotel, setHotel] = useState({
        admin: id,
        hotelname: '',
        city: '',
        address: '',
        rating: '[]', 
        price: '',
        review: '[]', 
        rooms: ''
    });
    const [image, setImage] = useState(null);
    const [rimage1, setRImage1] = useState(null);
    const [rimage2, setRImage2] = useState(null);
    const [rimage3, setRImage3] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHotel({ ...hotel, [name]: value });
    };

    const handleChangecity=(e)=>
    {
        const {name,value}= e.target;
        const lowercaseCity = value.toLowerCase()
        setHotel({...hotel, [name]: lowercaseCity})
    }

    const handleImageChange = (e) => {
        if (e.target.files.length > 0) {
            setImage(e.target.files[0]);
        }
    };

    const handleImageChange1 = (e) => {
        if (e.target.files.length > 0) {
            setRImage1(e.target.files[0]);
        }
    };

    const handleImageChange2 = (e) => {
        if (e.target.files.length > 0) {
            setRImage2(e.target.files[0]);
        }
    };

    const handleImageChange3 = (e) => {
        if (e.target.files.length > 0) {
            setRImage3(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('admin', hotel.admin);
        formData.append('hotelname', hotel.hotelname);
        formData.append('city', hotel.city);
        formData.append('address', hotel.address);
        formData.append('rating', hotel.rating);
        formData.append('price', hotel.price);
        formData.append('review', hotel.review);
        formData.append('rooms', hotel.rooms);
        if (image) {
            formData.append('image', image);
        }
        if (rimage1) {
            formData.append('room_image1', rimage1);
        }
        if (rimage2) {
            formData.append('room_image2', rimage2);
        }
        if (rimage3) {
            formData.append('room_image3', rimage3);
        }

        try {
            const res = await axios.post('https://hotel-backend-3.onrender.com/addhotel', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(res.data);
            alert('Hotel added successfully');
        } catch (error) {
            console.error(error);
            alert('Failed to add hotel');
        }
    };

    return (
        <><Header /><div className="container mt-4">
            <h2 className="mb-4">Add Hotel</h2>
            <form onSubmit={handleSubmit}>
                {/* Form Fields */}
                <div className="mb-3">
                    <label htmlFor="hotelname" className="form-label">Hotel Name:</label>
                    <input
                        type="text"
                        id="hotelname"
                        name="hotelname"
                        className="form-control"
                        value={hotel.hotelname}
                        onChange={handleChange}
                        required />
                </div>
                <div className="mb-3">
                    <label htmlFor="city" className="form-label">City:</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        className="form-control"
                        value={hotel.city}
                        onChange={handleChangecity}
                        required />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address:</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        className="form-control"
                        value={hotel.address}
                        onChange={handleChange}
                        required />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price:</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        className="form-control"
                        value={hotel.price}
                        onChange={handleChange}
                        min="0" />
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Image:</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        className="form-control"
                        onChange={handleImageChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="rimage1" className="form-label">Room Image 1:</label>
                    <input
                        type="file"
                        id="rimage1"
                        name="rimage1"
                        className="form-control"
                        onChange={handleImageChange1} />
                </div>
                <div className="mb-3">
                    <label htmlFor="rimage2" className="form-label">Room Image 2:</label>
                    <input
                        type="file"
                        id="rimage2"
                        name="rimage2"
                        className="form-control"
                        onChange={handleImageChange2} />
                </div>
                <div className="mb-3">
                    <label htmlFor="rimage3" className="form-label">Room Image 3:</label>
                    <input
                        type="file"
                        id="rimage3"
                        name="rimage3"
                        className="form-control"
                        onChange={handleImageChange3} />
                </div>
                <div className="mb-3">
                    <label htmlFor="rooms" className="form-label">Number of Rooms:</label>
                    <input
                        type="number"
                        id="rooms"
                        name="rooms"
                        className="form-control"
                        value={hotel.rooms}
                        onChange={handleChange}
                        min="1"
                        required />
                </div>
                <button type="submit" className="btn btn-primary my-5">Add Hotel</button>
            </form>
        </div>
        <Footer/>
        </>
    );
}
