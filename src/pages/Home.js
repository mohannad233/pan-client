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
  const [displayText, setDisplayText] = useState("بان تكا ");

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayText((prevText) => (prevText === "بان تكا" ? "pan tikkah" : "بان تكا"));
    }, 3000); // تبديل النص كل 3 ثواني

    return () => clearInterval(interval); // تنظيف المؤقت عند إلغاء التثبيت
  }, []);

  return (
    <div className="home">
      <div className="admin-icon">
        <Link to="/login" className="admin-link">
          <FaUserShield size={30} />
        </Link>
      </div>
      <div className="top-bar">
        <div className="social-icons">
          <a
            href="https://www.instagram.com/Pan.tikka"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram size={30} className="social-icon" />
          </a>
          <a
            href="https://www.whatsapp.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp size={30} className="social-icon" />
          </a>
          <a
            href="https://www.snapchat.com/add/ali.yanbu"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaSnapchat size={30} className="social-icon" />
          </a>
          <a
            href="https://www.tiktok.com/@Pan.tikka"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTiktok size={30} className="social-icon" />
          </a>
        </div>
      </div>
      <header className="home-header">
        <img src={logo} alt="بان تيكه" className="logo animate-logo" />
        <h1 className="animate-text highlight-text">{displayText}</h1>
      </header>
      <nav className="home-nav">
        <Link to="/menu" className="nav-link">
          <FaUtensils className="nav-icon" /> منيو المطعم - FOOD MENU
        </Link>
        <Link to="/contact" className="nav-link">
          <FaPhoneAlt className="nav-icon" /> تواصل معنا - Contact Us
        </Link>
        <a
          href="https://maps.app.goo.gl/vWviT2ZgCudpt7Mq5?g_st=com.google.maps.preview.copy"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link"
        >
          <FaHeart className="nav-icon" /> قيمنا - Values
        </a>
      </nav>
      <div className="home-background"></div>
    </div>
  );
};

export default Home;
