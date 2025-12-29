import React from "react";
import image from "../assets/Image";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">

        {/* LEFT */}
        <div className="footer-content-left">
          <img
            src={image.logo}
            alt="Sootika Logo"
            className="footer-logo"
          />

          <p>
            Sootika is a celebration of timeless elegance, bringing together
            the rich traditions of women’s ethnic fashion with modern comfort.
            <b> We believe every woman deserves to feel graceful and confident. </b>
            Our curated collection includes sarees, kurtis, lehengas, and more
            crafted with detail, beauty, and cultural pride.
          </p>

          <div className="footer-social-icons">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={image.instagram} alt="Instagram" />
            </a>

            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={image.facebook} alt="Facebook" />
            </a>

            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={image.linked} alt="LinkedIn" />
            </a>
          </div>
        </div>

        {/* CENTER */}
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/help">Help</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* RIGHT */}
        <div className="footer-content-right">
          <h3>GET IN TOUCH</h3>
          <ul>
            <li>+91 9995977246</li>
            <li>sootika000@gmail.com</li>
          </ul>
        </div>
      </div>

      <hr />

      <p className="footer-copy">
        © 2025 Sootika. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
