import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

export default function Navbar({ userData, logOut }) {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(true); // إغلاق القائمة بعد اختيار عنصر
  const toggleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed); // فتح أو غلق القائمة عند الضغط على زر القائمة

  return (
    <nav className="navbar navbar-expand-lg fixed-top shadow rounded pb-2 ">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/home">
          Noxe
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded={!isNavCollapsed ? true : false}
          aria-label="Toggle navigation"
          onClick={toggleNavCollapse}
        >
          <i className="fa-solid fa-bars"></i>
        </button>
        <div
          className={`collapse navbar-collapse ${
            !isNavCollapsed ? "show" : ""
          }`}
          id="navbarSupportedContent"
        >
          {userData && (
            <ul className="navbar-nav me-auto mb-1 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/home"
                  onClick={handleNavCollapse} // يغلق القائمة المنسدلة بعد اختيار العنصر
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/movies"
                  onClick={handleNavCollapse}
                >
                  Movies
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/people"
                  onClick={handleNavCollapse}
                >
                  People
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/tv"
                  onClick={handleNavCollapse}
                >
                  TV
                </Link>
              </li>
            </ul>
          )}

          <ul className="navbar-nav ms-auto mb-1 mb-lg-0">
            {userData && (
              <li className="nav-item d-flex justify-content-between align-items-center">
                <i className="fa-brands fa-facebook"></i>
                <i className="fa-brands fa-twitter"></i>
                <i className="fa-brands fa-instagram"></i>
              </li>
            )}
            {userData == null && (
              <>
                <li className="nav-item me-2">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/login"
                    onClick={handleNavCollapse}
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item me-2">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/register"
                    onClick={handleNavCollapse}
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
            {userData && <span className="mt-3 mt-lg-0" onClick={logOut}>Logout</span>}
          </ul>
        </div>
      </div>
    </nav>
  );
}
