import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaWhatsapp,
  FaSnapchat,
  FaTiktok,
  FaUserShield,
  FaUtensils,
  FaPhoneAlt,
  FaHeart
} from "react-icons/fa";
import "./Home.css";
import logo from "../images/logo.jpg";

const Home = () => {
  const [displayText, setDisplayText] = useState("بان تكا");

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayText((prevText) => (prevText === "بان تكا" ? "pan tikkah" : "بان تكا"));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home">
      { 
      <div className="admin-icon">
        <Link to="/login" className="admin-link">
          <FaUserShield size={30} />
        </Link>
      </div>
       }
      <header className="home-header">
        <img src={logo} alt="بان تيكه" className="logo animate-logo" />
        <h1 className="animate-text highlight-text">{displayText}</h1>
        <div className="social-icons">
          <a
            href="https://www.instagram.com/Pan.tikka"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram size={40} className="social-icon" />
          </a>
          <a
            href="https://www.whatsapp.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp size={40} className="social-icon" />
          </a>
          <a
            href="https://www.snapchat.com/add/ali.yanbu"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaSnapchat size={40} className="social-icon" />
          </a>
          <a
            href="https://www.tiktok.com/@Pan.tikka"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTiktok size={40} className="social-icon" />
          </a>
        </div>
      </header>
      <nav className="home-nav">
        <Link to="/menu" className="nav-link">
          <FaUtensils className="nav-icon" /> منيو المطعم - FOOD MENU
        </Link>
        <Link to="/contact" className="nav-link">
          <FaPhoneAlt className="nav-icon" /> تواصل معنا - Contact Us
        </Link>
        <a
          href="https://www.google.com/maps/place/%D8%A8%D8%A7%D9%86+%D8%B3%D8%A7%D9%86%D8%AF%D9%88%D8%AA%D8%B4+%7C+PAN+Sandwich%E2%80%AD/@24.0845273,38.0416806,17z/data=!4m8!3m7!1s0x15b9070078c77f37:0xe3a2506858430826!8m2!3d24.0845273!4d38.0416806!9m1!1b1!16s%2Fg%2F11lmhxqb2t?entry=ttu"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link"
        >
          <FaHeart className="nav-icon" /> قيمنا - Review Us
        </a>
      </nav>
      <div className="home-background"></div>
    </div>
  );
};

export default Home;
