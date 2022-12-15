
import '../../assets/css/index.css'
import '../../assets/css/grid.css';
import '../../assets/css/fonts.css';
import './style.css'
import { ProductContext } from '../../components/Context';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { BsChevronRight, BsChevronLeft, BsCartPlus, BsHeart } from 'react-icons/bs';
import { formatCurrency } from '../../ultil';
import { deal, famous } from '../../data';
import { Product } from '../../components/Product';


export const HomePage = () => {
    const [viewLast, setViewLast] = useState("latest-products")
    const [viewBS, setViewBS] = useState("latest-products")

    const navigator = useNavigate()

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
    },[])

    React.useEffect(() => {
        var slide_index = 0;
        var slides = document.querySelectorAll('.slide');

        const hideAllSlide = () => {
            slides.forEach(e => {
                e.classList.remove('active');
            })
        }

        const showSlide = () => {
            hideAllSlide();
            slides[slide_index].classList.add('active');
        }

        const nextSlide = () => slide_index = slide_index + 1 === slides.length ? 0 : slide_index + 1

        const prevSlide = () => slide_index = slide_index - 1 < 0 ? slides.length - 1 : slide_index - 1
        document.querySelector('.slide-next').addEventListener('click', () => {
            nextSlide();
            showSlide();
        })

        document.querySelector('.slide-prev').addEventListener('click', () => {
            prevSlide();
            showSlide();
        })

        showSlide();
    });

    const handleClickVL = () => {
        if(viewLast === "") {
            setViewLast("latest-products")
        }
        else setViewLast("")
    }
    const handleClickBS = () => {
        if(viewLast === "") {
            setViewBS("latest-products")
        }
        else setViewBS("")
    }

    const AddToCart = (data, product) => {
        if(localStorage.getItem('current-user') === null) {
            navigator('/login')
        }
        else {
            data.setDataToCart({product, "quantity": 1})
            alert("thêm thành công")
        }
    }

    return (
        <ProductContext.Consumer>
            {
                data => (
                    <div className='home-wrapper'>
                        <div className="hero">
                            <div className="slider">
                                <div className="container">

                                    <div className="slide active">
                                        <div className="info">
                                            <div className="info-content">
                                                <h3 className="top-down">
                                                    {
                                                        data.data.length > 0 && data.data[4].product_name
                                                    }
                                                </h3>
                                                <h2 className="top-down trans-delay-0-2">
                                                    {data.data.length > 0 && data.data[4].product_brand}
                                                </h2>
                                                <p className="top-down trans-delay-0-4" dangerouslySetInnerHTML={{__html: data.data.length > 0?data.data[4].product_description:''}}>
                                                </p>
                                                <div className="top-down trans-delay-0-6">
                                                    <Link to={data.data.length > 0 && `/shop/${data.data[4].idproduct}`}>
                                                        <button className="btn-flat btn-hover">
                                                            <span>shop now</span>
                                                        </button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="img top-down">
                                            <img src={data.data.length > 0 && `https://hcmut-e-commerce.herokuapp.com/${data.data[4].product_image01}`} alt=""/>
                                        </div>
                                    </div>

                                    <div className="slide ">
                                        <div className="info">
                                            <div className="info-content">
                                                <h3 className="top-down">
                                                    {
                                                        data.data.length > 0 && data.data[4].product_name
                                                    }
                                                </h3>
                                                <h2 className="top-down trans-delay-0-2">
                                                    {data.data.length > 0 && data.data[4].product_brand}
                                                </h2>
                                                <p className="top-down trans-delay-0-4" dangerouslySetInnerHTML={{__html: data.data.length > 0?data.data[4].product_description:''}}>
                                                </p>
                                                <div className="top-down trans-delay-0-6">
                                                    <Link to="/ProductDetails">
                                                        <button className="btn-flat btn-hover">
                                                            <span>shop now</span>
                                                        </button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="img top-down">
                                            <img src={data.data.length > 0 && `https://hcmut-e-commerce.herokuapp.com/${data.data[4].product_image01}`} alt=""/>
                                        </div>
                                    </div>
                                
                                </div>

                                <button className="slide-controll slide-next">
                                    <i className="fa-solid fa-chevron-right"></i>
                                </button>

                                <button className="slide-controll slide-prev">
                                    <i className="fa-solid fa-chevron-left"></i>
                                </button>

                            </div>
                        </div>
                        <div className='lazy-component slide-discound'>
                            <div className='css-margin row'>
                            
                                {
                                    deal.map((i, index) => (
                                        <div key={index} className="col-3 lazy-item">
                                            <div className='lazy-img'>
                                                <img src={i.img}/>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        
                        <div className='lazy-component'>
                            <div className='css-margin row'>
                                <h5>Thương hiệu nổi bật</h5>
                                {
                                    famous.map((i, index) => (
                                        <div key={index} className="col-3 lazy-item">
                                            <div className='lazy-img'>
                                                <img src={i.img}/>
                                            </div>
                                            <span>{i.brand}</span>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className='lazy-component' style={{paddingBottom: "0"}}>
                            <div className='css-margin'>
                                    <h5 className='lazy-header'>CPU
                                        <span>Xem tất cả
                                            <i className="fa-solid fa-angle-right"></i>
                                        </span>
                                    </h5>

                                <div className='listproduct'>
                                    {
                                        data.data.filter(i => i.product_type === "cpu").slice(2,7).map((i, index) => (
                                            <div key={index} className="lazy-product">
                                                <Product product={i}/>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='lazy-component slide-discound-2'>
                            <div className='css-margin row'>
                                <img src='https://lh3.googleusercontent.com/yw75y5tTZPWOR4iZ76F9Tw1H3IrBGZJTpcaFWLrjRSW5ObFp9pgSWnRq-ZStYTe60bhH-t8TRqX1imI-AeIRC8Z_hVpMIBhH=rw-w0' className='col-6'/>
                                <img src='https://freepixel-prod.s3.amazonaws.com/thumb/free-vector-graphic-diwali-festival-sale-up-to-50-discount-offer-website-header-or-banner-design-with-creative-oil-lamps-th-110107814.jpg' className='col-6'/>
                            </div>
                        </div>
                        <div className='lazy-component'>
                            <div className='css-margin'>
                                    <h5 className='lazy-header'>RAM
                                        <span>Xem tất cả
                                            <i className="fa-solid fa-angle-right"></i>
                                        </span>
                                    </h5>

                                <div className='listproduct'>
                                    {
                                        data.data.filter(i => i.product_type === "ram").slice(0,6).map((i, index) => (
                                            <div key={index} className="lazy-product">
                                                <Product product={i}/>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>

                        <div className='lazy-component'>
                            <div className='css-margin'>
                                    <h5 className='lazy-header'>Dành cho bạn
                                        <span>Xem tất cả
                                            <i className="fa-solid fa-angle-right"></i>
                                        </span>
                                    </h5>

                                <div className='listproduct'>
                                    {
                                        data.data.slice(0,10).map((i, index) => (
                                            <div key={index} className="lazy-product">
                                                <Product product={i}/>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </ProductContext.Consumer>
    )
}