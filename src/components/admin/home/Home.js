import React, { useState,useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Home.css";
import Header from "../../header/Header"
import Footer from "../../Footer/Footer"
import { AdminContext } from '../../AdminContext';


export default function Home() {

    const {setAdminId} = useContext(AdminContext)
    const navigate = useNavigate();
    const [admin, setAdmin] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAdmin({ ...admin, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('https://hotel-backend-3.onrender.com/validateadmin', {
                username: admin.username,
                password: admin.password
            });
            
            if (res.data.message === "admin login successful") {
                setSuccess('Admin login successful');
                setError('');
                setAdminId(admin.username)
                const { username, _id } = res.data.admindata;
                setTimeout(() => {
                    navigate(`/dashboard/${username}/${_id}`);
                }, 2000);
            }
        } catch (err) {
            console.error(err);
            setError('Invalid username or password. Please try again.');
            setSuccess('');
        }
    };

    return (
        <><Header /><div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
                <h2 className="text-center mb-4">Login</h2>
                <form onSubmit={handleSubmit}>
                    {success && <div className="alert alert-success">{success}</div>}
                    {error && <div className="alert alert-danger">{error}</div>}

                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            type="text"
                            className="form-control"
                            placeholder="Enter your username"
                            name="username"
                            value={admin.username}
                            onChange={handleChange}
                            required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            className="form-control"
                            placeholder="Enter your password"
                            name="password"
                            value={admin.password}
                            onChange={handleChange}
                            required />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block my-3">Login</button>

                    <div className="text-center mt-3">
                        <a href="/admin_signup">Create an account?</a>
                    </div>
                </form>
            </div>
        </div>
        <Footer/>
        </>
    );
}
