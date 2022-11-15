import { BsFacebook, BsInstagram, BsYoutube, BsTwitter } from 'react-icons/bs';
import React from 'react';
import '../../assets/css/index.css'
import '../../assets/css/grid.css';
import '../../assets/css/fonts.css';

export default function Footer() {
    return (
        <footer className="bg-second">
            <div className="container">
                <div className="row">
                    <div className="col-3 col-md-6">
                        <h3 className="footer-head">Products</h3>
                        <ul className="menu">
                            <li><a href="/#">Help center</a></li>
                            <li><a href="/#">Contact us</a></li>
                            <li><a href="/#">product help</a></li>
                            <li><a href="/#">warranty</a></li>
                            <li><a href="/#">order status</a></li>
                        </ul>
                    </div>
                    <div className="col-3 col-md-6">
                        <h3 className="footer-head">services</h3>
                        <ul className="menu">
                            <li><a href="/#">Help center</a></li>
                            <li><a href="/#">Contact us</a></li>
                            <li><a href="/#">product help</a></li>
                            <li><a href="/#">warranty</a></li>
                            <li><a href="/#">order status</a></li>
                        </ul>
                    </div>
                    <div className="col-3 col-md-6">
                        <h3 className="footer-head">support</h3>
                        <ul className="menu">
                            <li><a href="/#">Help center</a></li>
                            <li><a href="/#">Contact us</a></li>
                            <li><a href="/#">product help</a></li>
                            <li><a href="/#">warranty</a></li>
                            <li><a href="/#">order status</a></li>
                        </ul>
                    </div>
                    <div className="col-3 col-md-6 col-sm-12">
                        <div className="contact">
                            <h3 className="contact-header">
                                ABELO
                            </h3>
                            <ul className="contact-socials">
                                <li><a href="/#">
                                        <BsFacebook/>
                                    </a></li>
                                <li><a href="/#">
                                        <BsInstagram/>
                                    </a></li>
                                <li><a href="/#">
                                        <BsYoutube/>
                                    </a></li>
                                <li><a href="/#">
                                        <BsTwitter/>
                                    </a></li>
                            </ul>
                        </div>
                        <div className="subscribe">
                            <input type="email" placeholder="ENTER YOUR EMAIL" />
                            <button>subscribe</button>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}