import React from "react";
import "./FooterMap.css";

import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="d-flex justify-content-around">
      <footer className="footer d-flex">
        <p className="footer__copyright me-5 ms-5">
          2022 Tous droits réservés EasyShipping
        </p>
        <div id="Links" className="me-5 ms-5">
          <a className="text-secondary m-3 text-decoration-none" href="">
            Confidentialité
          </a>
          <a className="text-secondary m-3 text-decoration-none" href="">
            Accessibilité
          </a>
          <a className="text-secondary m-3 text-decoration-none" href="">
            Conditions
          </a>
          <a className="text-secondary m-3 text-decoration-none" href="">
            F.A.Q
          </a>
          <a className="text-secondary m-3 text-decoration-none" href="">
            Nous contacter
          </a>
        </div>
        <div id="Social" className="footer__social ms-5">
          <a
            className="text-secondary m-3"
            href="https://www.facebook.com/easyshipping95/"
            target="_blank"
          >
            <FaFacebookF />
          </a>
          <a className="text-secondary m-3" href="" target="_blank">
            <FaTwitter />
          </a>
          <a
            className="text-secondary m-3"
            href="https://www.instagram.com/easyshipping95/"
            target="_blank"
          >
            <FaInstagram />
          </a>
        </div>
      </footer>
    </div>
  );
};
export default Footer;
