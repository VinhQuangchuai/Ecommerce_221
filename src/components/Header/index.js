import {
  BiBell,
  BiUserCircle,
  BiCart,
  BiChevronDown,
  BiX,
  BiMenu,
  BiSearchAlt,
} from "react-icons/bi";
import React from "react";
import "../../assets/css/index.css";
import "../../assets/css/grid.css";
import "../../assets/css/fonts.css";

export default function Header() {
  return (
    <header>
      <div className="mobile-menu bg-second">
        <a href="/#" className="mb-logo">
          ABELO
        </a>
        <span className="mb-menu-toggle" id="mb-menu-toggle">
          <BiMenu />
        </span>
      </div>

      <div className="header-wrapper" id="header-wrapper">
        <span className="mb-menu-toggle mb-menu-close" id="mb-menu-close">
          <BiX />
        </span>
        <div className="bg-second pt-4">
          <div className="top-header container">
            <ul className="devided">
              <li>
                <a href="/#">+840123456789</a>
              </li>
              <li>
                <a href="/#">abelo@mail.com</a>
              </li>
            </ul>
            <ul className="devided">
              <li className="dropdown">
                <a href="/#">USD</a>
                <BiChevronDown />
                <ul className="dropdown-content">
                  <li>
                    <a href="/#">VND</a>
                  </li>
                  <li>
                    <a href="/#">JPY</a>
                  </li>
                  <li>
                    <a href="/#">EUR</a>
                  </li>
                </ul>
              </li>
              <li className="dropdown">
                <a href="/#">ENGLISH</a>
                <BiChevronDown />
                <ul className="dropdown-content">
                  <li>
                    <a href="/#">VIETNAMESE</a>
                  </li>
                  <li>
                    <a href="/#">JAPANESE</a>
                  </li>
                  <li>
                    <a href="/#">FRENCH</a>
                  </li>
                  <li>
                    <a href="/#">SPANISH</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="/#">ORDER TRACKING</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-main">
          <div className="mid-header container">
            <a href="/#" className="logo">
              ABELO
            </a>
            <div className="search">
              <input type="text" placeholder="Search" />
              <BiSearchAlt
                style={{
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                  right: "20px",
                  cursor: "pointer",
                  fontSize: "25px",
                }}
              />
            </div>
            <ul className="user-menu">
              <li>
                <a href="/#">
                  <BiBell />
                </a>
              </li>
              <li>
                <a href="/#">
                  <BiUserCircle />
                </a>
              </li>
              <li>
                <a href="/#">
                  <BiCart />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-second">
          <div className="bottom-header container">
            <ul className="main-menu mb-0">
              <li>
                <a href="/#">Home</a>
              </li>

              <li className="mega-dropdown">
                <a href="/shop">Shop</a>
              </li>
              <li>
                <a href="/#">blog</a>
              </li>
              <li>
                <a href="/#">contact</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
