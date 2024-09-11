import React, { useState } from 'react';
import axios from 'axios';
import Header from '../../header/Header';
import Footer from "../../Footer/Footer"


export default function Register() {
    const [user, setUser] = useState({
        username: '',
        phno: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('https://hotel-backend-3.onrender.com/putuser', user);
            
            if (res.data.message === "User added successfully") {
                setSuccess('User added successfully');
                setError('');
                setUser({ username: '', phno: '', password: '' }); 
            }
        } catch (err) {
            console.error(err);
            setError('Invalid username or phone number. Please try again.');
            setSuccess('');
        }
    };

    return (
        <><Header /><div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
                <h2 className="text-center mb-4">Register</h2>
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
                            value={user.username}
                            onChange={handleChange}
                            required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phno">Phone Number</label>
                        <input
                            id="phno"
                            type="text"
                            className="form-control"
                            placeholder="Enter your phone number"
                            name="phno"
                            value={user.phno}
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
                            value={user.password}
                            onChange={handleChange}
                            required />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block my-3">Register</button>

                    <div className="text-center mt-3">
                        <a href="/user_login">Already have an account?</a>
                    </div>
                </form>
            </div>
        </div>
        <Footer/>
        </>
    );
}
