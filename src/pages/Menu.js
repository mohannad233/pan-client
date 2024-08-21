// Menu.js
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationArrow,
  faClipboardList,
  faCommentDots,
  faHouseChimney, // Updated home icon
  faFire,
  faBreadSlice,
  faWineBottle, // Updated sauce icon
  faGlassWhiskey,
  faEgg,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../components/Header";
import "./Menu.css";
import { Link } from "react-router-dom";
import axios from "../services/axios";

const Menu = () => {
  const [products, setProducts] = useState([]);
  const [activeSection, setActiveSection] = useState("سندويتشات");
  const [showFeedbackCard, setShowFeedbackCard] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
    setActiveSection(sectionId.split("-")[1]);
  };

  const sections = ["سندويتشات", "صوصات", "عصيرات", "فطور"];

  const groupedProducts = products.reduce((acc, product) => {
    const section = product.sections || "غير محدد";
    if (!acc[section]) {
      acc[section] = [];
    }
    acc[section].push(product);
    return acc;
  }, {});

  const handleClickOutside = (e) => {
    if (
      !e.target.closest(".feedback-card") &&
      !e.target.closest(".icon-item")
    ) {
      setShowFeedbackCard(false);
    }
  };

  useEffect(() => {
    if (showFeedbackCard) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showFeedbackCard]);

  const handleSendMessage = () => {
    const whatsappNumber = "05933259414";
    const url = `https://wa.me/966${whatsappNumber}?text=${encodeURIComponent(
      `الاسم: ${name || "غير معروف"}\nرقم الجوال: ${phone}\nالرسالة: ${message}`
    )}`;
    window.open(url, "_blank");
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="menu-page">
      <Header />
      <div className="secondary-icons">
        <div className="icon-item">
          <Link to="/" className="home-icon">
            <FontAwesomeIcon icon={faHouseChimney} size="lg" />
          </Link>
        </div>
        <div className="icon-item">
          <a
            href="https://maps.app.goo.gl/vWviT2ZgCudpt7Mq5?g_st=com.google.maps.preview.copy"
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline"
          >
            <FontAwesomeIcon icon={faLocationArrow} size="lg" />
            <span>الموقع</span>
          </a>
        </div>
        <div className="icon-item">
          <Link
            to="/book"
            style={{
              textAlign: "center",
              color: "#89598c",
              textDecoration: "none",
            }}
          >
            <FontAwesomeIcon icon={faClipboardList} size="lg" />
            <span>القائمة الذكية</span>
          </Link>
        </div>
        <div className="icon-item">
          <div
            style={{
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={() => setShowFeedbackCard(!showFeedbackCard)}
          >
            <FontAwesomeIcon icon={faCommentDots} size="lg" />
            <span>رأيك يهمنا</span>
          </div>
        </div>
      </div>

      {showFeedbackCard && (
        <div className="feedback-card">
          <h2>رأيك يهمنا</h2>
          <input
            type="text"
            placeholder="الاسم (اختياري)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="رقم الجوال"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <textarea
            placeholder="اقتراحك"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <button onClick={handleSendMessage}>إرسال</button>
        </div>
      )}

      <div className="sections-grid sticky-sections">
        {sections.map((section) => (
          <div
            key={section}
            className={`section-item ${
              activeSection === section ? "active" : ""
            }`}
            onClick={() => scrollToSection(`section-${section}`)}
          >
            <FontAwesomeIcon
              icon={
                section === "سندويتشات"
                  ? faBreadSlice
                  : section === "صوصات"
                  ? faWineBottle
                  : section === "عصيرات"
                  ? faGlassWhiskey
                  : faEgg
              }
              size="2x"
            />
            <span>{section}</span>
          </div>
        ))}
      </div>

      <main className="menu-content">
        <h1>Menu</h1>
        {sections.map((section) => (
          <div key={section} id={`section-${section}`} className="menu-section">
            <div className="product-list">
              {groupedProducts[section]?.map((product) => (
                <div
                  className={`product-card ${
                    product.available ? "" : "unavailable"
                  }`}
                  key={product.id}
                  onClick={() => handleProductClick(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                    loading="lazy"
                  />
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <div className="product-details">
                      <div className="product-price">{product.price} SR</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {section !== sections.slice(-1)[0] && (
              <hr className="section-divider" />
            )}
          </div>
        ))}
      </main>

      {selectedProduct && (
        <div className="product-modal" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedProduct.name}</h2>
            <img src={selectedProduct.image} alt={selectedProduct.name} />
            <div className="product-details">
              <div className="product-price">{selectedProduct.price} SR</div>
            </div>
            <button onClick={handleCloseModal}>إغلاق</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
