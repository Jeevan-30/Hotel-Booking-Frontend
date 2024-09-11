import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../../header/Header"
import Footer from "../../Footer/Footer"

export default function Booking() {
    const { hid } = useParams();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBookings = async (hid) => {
        try {
            setLoading(true);
            const res = await axios.get(`https://hotel-backend-3.onrender.com/fetchbookings/${hid}`);
            setBookings(res.data);
        } catch (err) {
            setError(err);
            console.error('Error fetching bookings:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings(hid);
    }, [hid]);

    if (loading) return <div className="text-center mt-5"><div className="spinner-border" role="status"><span className="sr-only">Loading...</span></div></div>;
    if (error) return <div className="alert alert-danger mt-3">Error fetching bookings: {error.message}</div>;

    return (
        <><Header /><div className="container mt-5">
            <div className="list-group">
                {bookings.length > 0 ? (
                    bookings.map((booking) => (
                        <div className="list-group-item list-group-item-action" key={booking._id}>
                            <h5 className="mb-1 text-danger">Booking ID: {booking._id}</h5>
                            <p className="mb-1"><strong>Guest Name:</strong> {booking.customer}</p>
                            <p className="mb-1"><strong>Guest Number:</strong> {booking.custNo}</p>
                            <p className="mb-1"><strong>Check-in Date:</strong> {new Date(booking.checkInDate).toLocaleDateString()}</p>
                            <p className="mb-1"><strong>Check-out Date:</strong> {new Date(booking.checkOutDate).toLocaleDateString()}</p>
                        </div>
                    ))
                ) : (
                    <div className="alert alert-info" role="alert">No bookings found.</div>
                )}
            </div>
        </div>
        <Footer/>
        </>
    );
}
