import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" />
                <p>The College Canteen App simplifies ordering and management, allowing students to browse the menu, place orders, and pay online. It enables real-time order tracking, special offers, and feedback, while helping staff manage inventory, update menus, and monitor sales. Convenient, efficient, and user-friendly for the entire campus community.</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon}alt="" />
                </div>

            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delevery</li>
                    <li>privacy Policy</li>
                </ul>

            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+1-211-546-345</li>
                    <li>contact@PEC-Delights.com</li>
                </ul>
            </div>
           
        </div>
         <hr />
            <p className="footer-copyright">
                Copyright 2025 @ PEC-Delights.com-All Right Reserved.
            </p>
      
    </div>
  )
}

export default Footer
