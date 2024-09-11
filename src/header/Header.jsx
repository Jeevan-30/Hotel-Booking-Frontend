import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faPerson } from "@fortawesome/free-solid-svg-icons";
import "./header.css";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../UserContext';
import { SearchContext } from '../SearhContext'
import axios from 'axios';

const Header = ({ type }) => {
    const { name } = useContext(UserContext);
    const { setHotels} =useContext(UserContext)
    const navigate = useNavigate();
    const { place, setPlace, setOption} = useContext(SearchContext);
    const [ setDestination] = useState("");
   

    const [openOptions, setOpenOptions] = useState(false);
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1,
    });

    const handleOption = (name, operation) => {
        setOptions((prev) => ({
            ...prev,
            [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
        }));
        setOption((prev) => ({
            ...prev,
            [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
        }));
    };

    const handleSearch = async () => {
        if (!place.trim()) {
            alert('Please select a destination');
            return;
        }
        try {
            if(name !== ''){
                const response = await axios.get(`http://localhost:3001/hoteldata`, {
                    params: { place: place.trim() }
                });
                console.log(response.data);
                setHotels(response.data)
                navigate('/hotels')
            } 
            else{
                alert('Please login to search for hotels')
            }
        } catch (error) {
            console.error('Error fetching hotels:', error);
            alert('Failed to fetch hotels');
        }
    };


    return (
        <div className="header">
            <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
                <div className="headerList">
                    <div className="headerListItem active">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Stays</span>
                    </div>
                </div>
                {
                    name === '' ? (
                        <>
                            <a href="/login" className="btn btn-secondary text-light">Login</a>
                            <a href="/signup" className="btn btn-primary text-light mx-3">Register</a>
                            <a href="/hadmin" className="btn btn-success text-light mx-3">Hotel admin</a>
                        </>
                    ) : null
                }

                {type !== "list" &&
                    <>
                        <h1 className="headerTitle">A lifetime of discounts? It'd be a dream</h1>
                        <p className="headerDesc"><b>Get rewarded for your travels - unlock instant savings of 10% !</b></p>
                        <div className="headerSearch">
                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                                <input
                                    type="text"
                                    placeholder="Desired Location"
                                    className="headerSearchInput"
                                    onChange={e => {
                                        setDestination(e.target.value);
                                        setPlace(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                                <span onClick={() => setOpenOptions(!openOptions)} className="headerSearchText">
                                    {`${options.adult} adult · ${options.children} children · ${options.room} rooms`}
                                </span>
                                {openOptions && (
                                    <div className="options">
                                        <div className="optionItem">
                                            <span className="optionText">Adult</span>
                                            <div className="optionCounter">
                                                <button
                                                    disabled={options.adult <= 1}
                                                    className="optionCounterButton"
                                                    onClick={() => handleOption("adult", "d")}
                                                >-</button>
                                                <span className="optionCounterNumber">{options.adult}</span>
                                                <button
                                                    className="optionCounterButton"
                                                    onClick={() => handleOption("adult", "i")}
                                                >+</button>
                                            </div>
                                        </div>
                                        <div className="optionItem">
                                            <span className="optionText">Children</span>
                                            <div className="optionCounter">
                                                <button
                                                    disabled={options.children <= 0}
                                                    className="optionCounterButton"
                                                    onClick={() => handleOption("children", "d")}
                                                >-</button>
                                                <span className="optionCounterNumber">{options.children}</span>
                                                <button
                                                    className="optionCounterButton"
                                                    onClick={() => handleOption("children", "i")}
                                                >+</button>
                                            </div>
                                        </div>
                                        <div className="optionItem">
                                            <span className="optionText">Room</span>
                                            <div className="optionCounter">
                                                <button
                                                    disabled={options.room <= 1}
                                                    className="optionCounterButton"
                                                    onClick={() => handleOption("room", "d")}
                                                >-</button>
                                                <span className="optionCounterNumber">{options.room}</span>
                                                <button
                                                    className="optionCounterButton"
                                                    onClick={() => handleOption("room", "i")}
                                                >+</button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="headerSearchItem">
                                <button className="headerBtn" onClick={handleSearch}>Search</button>
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    );
};

export default Header;
