import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../header/Header';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm'; 
import Footer from '../../Footer/Footer';

const stripePromise = loadStripe('pk_test_51PuZIVKLgDvYSZsimK8lDZTIMWI7IUOlZDPGwmyCxrihhqTsdyZ0ffErcMtWterqNv2ECzsOxqWiEPyz2HhePrkc00dj95jMYD'); 

export default function RoomBooking() {
    const { rid, hid, cost, aid } = useParams();
    const [formData, setFormData] = useState({
        admin: aid,
        hotel: hid,
        room: rid,
        customer: '',
        custNo: '',
        checkInDate: '',
        checkOutDate: '',
        days: 1,
        totalprice: cost,
    });
    const [errorMessage] = useState("");

    useEffect(() => {
        setFormData(prevData => ({
            ...prevData,
            totalprice: prevData.days * cost
        }));
    }, [formData.days, cost]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => {
            const newFormData = { ...prevData, [name]: value };

            if (name === 'checkInDate' || name === 'checkOutDate') {
                const checkInDate = new Date(newFormData.checkInDate);
                const checkOutDate = new Date(newFormData.checkOutDate);

                if (checkInDate && checkOutDate) {
                    const days = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
                    newFormData.days = days > 0 ? days : 1;
                }
            }
            return newFormData;
        });
    };

    return (
        <>
            <Header />
            <div className="container mt-5 pt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <div className="p-4 bg-light rounded shadow">
                            <h1 className='mb-3'>Book Here</h1>
                            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                            <div className="mb-3">
                                <label htmlFor="checkInDate">Check In Date:</label>
                                <input
                                    id="checkInDate"
                                    type="date"
                                    className="form-control"
                                    name="checkInDate"
                                    value={formData.checkInDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="checkOutDate">Check Out Date:</label>
                                <input
                                    id="checkOutDate"
                                    type="date"
                                    className="form-control"
                                    name="checkOutDate"
                                    value={formData.checkOutDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="custNo">Phone No:</label>
                                <input
                                    id="custNo"
                                    type="text"
                                    className="form-control"
                                    name="custNo"
                                    value={formData.custNo}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="customer">Name:</label>
                                <input
                                    id="customer"
                                    type="text"
                                    className="form-control"
                                    name="customer"
                                    value={formData.customer}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="days">Days:</label>
                                <input
                                    id="days"
                                    type="number"
                                    className="form-control"
                                    name="days"
                                    value={formData.days}
                                    onChange={handleChange}
                                    required
                                    min="1"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="totalprice">Total Amount:</label>
                                <input
                                    id="totalprice"
                                    type="number"
                                    className="form-control"
                                    name="totalprice"
                                    value={formData.totalprice}
                                    readOnly
                                />
                            </div>
                            <Elements stripe={stripePromise}>
                                <PaymentForm formData={formData} setFormData={setFormData} />
                            </Elements>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}
