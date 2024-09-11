import React from 'react'
import './Footer.css'
<link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'></link>


const Footer = () => {
  return (
        <div className="footer" id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                    <p>© 2024  Hotel Company.Ltd
                        <br></br>
                        ABCD Complex,Near abc street ,chennai,Pin-638183</p>
            <div className="footer-social-icons">
              
               
            </div>
            </div>
            <div className="footer-content-centre">
                <h2>COMPANY</h2>
                <uL>
                    <li>Home</li>
                    <li>About</li>
                    <li>Service</li>
                    <li>Privacy policy</li>
                </uL>
                
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+91-9842350444</li>
                    <li>contact@hotel Company</li>
                </ul>
            </div>
        </div>
        <hr />
         <p className="copyright">Copyright 2024 © Hotel Company- All Right Reserved.</p>
    </div>
  )
}

export default Footer