import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed } from "@fortawesome/free-solid-svg-icons";
import "./header.css";
import { useNavigate, Link } from 'react-router-dom';
import { faSignInAlt, faUserPlus, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState } from 'react';
import { AdminContext } from "../AdminContext";
import { UserContext } from "../UserContext";

const Header = ({ type }) => {
    const { adminId, setAdminId } = useContext(AdminContext);
    const { UserId, setUserId } = useContext(UserContext);
    const [showButtons, setShowButtons] = useState(true);

    useEffect(()=>
    {
        if (UserId !== '' || adminId !== '')
        {
            setShowButtons(false);
        }
        else{
            setShowButtons(true);
        }
    },[UserId, adminId])


    const navigate = useNavigate();
    const handleLogin = () => navigate('/user_login');
    const handleSignup = () => navigate('/user_signup');

    return (
        <div className="header">
            <div id="buttons">
                {showButtons ? (
                    <>
                        <button className="btn bg-transparent text-white mx-2" onClick={handleLogin}>
                            <FontAwesomeIcon icon={faSignInAlt} className="me-2" />
                            Login
                        </button>
                        <button className="btn bg-transparent text-white mx-2" onClick={handleSignup}>
                            <FontAwesomeIcon icon={faUserPlus} className="me-2" />
                            Signup
                        </button>
                        <Link to="/admin_login" className="text-decoration-none btn btn-transparent text-light">
                            <FontAwesomeIcon icon={faUserShield} className="me-2" />
                            Admin
                        </Link>
                    </>
                ) : (
                    <Link to="/" className="text-decoration-none btn btn-transparent text-light">
                        <FontAwesomeIcon icon={faUserShield} className="me-2" />
                        Logout
                    </Link>
                )}
            </div>
            <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
                <div className="headerList">
                    <div className="headerListItem active">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Stays</span>
                    </div>
                </div>
                <p id="text" className="display-5 text-center">HOTEL BOOKING</p>
            </div>
        </div>
    );
};

export default Header;
