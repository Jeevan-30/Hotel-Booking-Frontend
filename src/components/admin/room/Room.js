import React, { useState } from 'react';
import { useParams} from 'react-router-dom';
import axios from 'axios';
import './Room.css';
import Header from "../../header/Header"
import Footer from '../../Footer/Footer';

export default function Room() {
    // const navigate = useNavigate();
    const { hid } = useParams();
    const [roomNo, setRoomNo] = useState(0);
    const [status, setStatus] = useState('available'); 

    const handleRoom = async (e) => {
        e.preventDefault(); 

        try {
            const res = await axios.post('https://hotel-backend-3.onrender.com/putroom', { hotel: hid, roomNo, status });
            alert(res.data.message);
        } catch (error) {
            console.error('Error adding room:', error);
        }
    };

    return (
        <><Header /><div className="container mt-4">
            <h2 className="mb-4">Add Room</h2>
            <form onSubmit={handleRoom} className="form-group">
                <div className="form-group">
                    <label htmlFor="roomNo">Room Number</label>
                    <input
                        type="Number"
                        id="roomNo"
                        name="roomNo"
                        className="form-control"
                        placeholder="Enter Room number"
                        value={roomNo}
                        onChange={(e) => setRoomNo(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <select
                        id="status"
                        name="status"
                        className="form-control"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="available">Available</option>
                        <option value="occupied">Occupied</option>
                        <option value="maintenance">Maintenance</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Add Room</button>
            </form>
        </div>
        <Footer/>
        </>
    );
}
