import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" id="logo"/>
                <p>Offering a wide range of dishes from comforting classics to healthy options, our canteen caters to every taste and dietary preference, including vegetarian, vegan, and gluten-free choices. With a focus on quality, hygiene, and speedy service, you can enjoy everything from quick snacks to satisfying meals in a lively and welcoming atmosphere. </p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                </ul>
            </div>
            <div className="footer-content-center">
                <h2>ANY SUGGESTIONS</h2>
                <ul>
                    <li>+91 6792763023</li>
                    <li>canteen123@gmail.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copyright">Copyright 2024 @ Canteen.com - All Rights Reserved.</p>

    </div>
  )
}

export default Footer