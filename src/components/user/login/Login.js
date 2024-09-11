import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../../header/Header';
import Footer from "../../Footer/Footer"
import { UserContext } from '../../UserContext';


export default function Login() {
    const navigate = useNavigate();
    const {setUserId} = useContext(UserContext)
    const [user, setUser] = useState({
        username: '',
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
            const res = await axios.post('https://hotel-backend-3.onrender.com/validateuser', user);
            
            if (res.data.message === "User login successful") {
                setSuccess('Login successful');
                setError('');
                const { username, _id } = res.data.userdata;
                setUserId(res.data.username)
                setTimeout(() => {
                    navigate(`/user_dashboard/${username}/${_id}`);
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
                            value={user.username}
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
                    <button type="submit" className="btn btn-primary btn-block mt-3">Login</button>

                    <div className="text-center mt-3">
                        <a href="/user_signup">Create an account?</a>
                    </div>
                </form>
            </div>
        </div>
        <Footer/>
        </>
    );
}
