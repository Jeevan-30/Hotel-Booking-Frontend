import React, { useState } from 'react';
import "./Signup.css"; 
import axios from 'axios';
import Header from "../../header/Header"
import Footer from "../../Footer/Footer"


export default function Signup() {
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
            const res = await axios.post('https://hotel-backend-3.onrender.com/addadmin', {
                username: admin.username,
                password: admin.password
            });
            if (res.status === 201) {
                setSuccess('Admin added successfully');
                setError('');
                setAdmin({ username: '', password: '' }); // Clear form
            }
        } catch (err) {
            console.error(err);
            setError('Failed to add admin. Please try again.');
            setSuccess('');
        }
    };

    return (
        <><Header /><div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
                <h2 className="text-center mb-4">Signup</h2>
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
                    <button type="submit" className="btn btn-primary btn-block my-3">Signup</button>

                    <div className="text-center mt-3">
                        <a href="/admin_login">Already have an account?</a>
                    </div>
                </form>
            </div>
        </div>
        <Footer/>
        </>
    );
}
