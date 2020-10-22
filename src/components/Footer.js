import React from "react";

const Footer = () => {
  return (
    <div className="site-footer">
      <h4 className="text-center">Coders Blog</h4>
      <p className="text-center">Follow us on Social Media</p>
      <div className="footer-social-links">
        <ul className="social-links-list">
          <li>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="facebook"
            >
              <i className="fa fa-facebook-f fa-lg"></i>
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="twitter"
            >
              <i className="fa fa-twitter fa-lg"></i>
            </a>
          </li>
          <li>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="instagram"
            >
              <i className="fa fa-instagram fa-lg"></i>
            </a>
          </li>
          <li>
            <a
              href="https://google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="google"
            >
              <i className="fa fa-google fa-lg"></i>
            </a>
          </li>
          <li>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="linkedin"
            >
              <i className="fa fa-linkedin fa-lg"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
