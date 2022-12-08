
import '../../assets/css/index.css'
import '../../assets/css/grid.css';
import '../../assets/css/fonts.css';
import './style.css'
import { ProductContext } from '../../components/Context';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { BsChevronRight, BsChevronLeft, BsCartPlus, BsHeart } from 'react-icons/bs';
import { formatCurrency } from '../../ultil';


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
                    <>
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
                                                <p className="top-down trans-delay-0-4">
                                                    {data.data.length > 0 && data.data[4].product_description}
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
                                                <p className="top-down trans-delay-0-4">
                                                    {data.data.length > 0 && data.data[4].product_description}
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
                                                <p className="top-down trans-delay-0-4">
                                                    {data.data.length > 0 && data.data[4].product_description}
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
                                    <i><BsChevronRight /></i>
                                </button>

                                <button className="slide-controll slide-prev">
                                    <i><BsChevronLeft /></i>
                                </button>

                            </div>
                        </div>


                        <div className="section">
                            <div className="container">
                                <div className="section-header">
                                    <h2>Latest product</h2>
                                </div>
                                <div className={`row ${viewLast}`}>
                                    {
                                        data.data.map((product, index) => (
                                            <div className="col-3 col-md-6 col-sm-12" key={index}>
                                                <div className="product-card">
                                                    <div className="product-card-img">
                                                        <img src={`https://hcmut-e-commerce.herokuapp.com/${product.product_image01}`} alt=""/>
                                                        <img src={`https://hcmut-e-commerce.herokuapp.com/${product.product_image02}`} alt=""/>
                                                    </div>
                                                    <div className="product-card-info">
                                                        <div className="product-btn-home">
                                                            <a href={`/shop/${product.idproduct}`} className="btn-flat btn-hover btn-shop-now">shop now</a>
                                                            <button className="btn-flat btn-hover btn-cart-add">
                                                                <i onClick={()=>AddToCart(data, product)}><BsCartPlus/></i>
                                                            </button>
                                                            <button className="btn-flat btn-hover btn-cart-add">
                                                                <i><BsHeart/></i>
                                                            </button>
                                                        </div>
                                                        <div className="product-card-name">
                                                            {product.product_name}
                                                        </div>
                                                        <div className="product-card-price">
                                                            <span><del>{formatCurrency(Number(product.product_old_price))}</del></span>
                                                            <span className="curr-price">{formatCurrency(Number(product.product_present_price))}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="section-footer">
                                    <a className="btn-flat btn-hover" onClick={handleClickVL}>{viewLast === "" ? "Hide" : "view all"}</a>
                                </div>
                            </div>
                        </div>

                        <div class="bg-second">
                            <div class="section container">
                                <div class="row display">
                                    <div class="col-4 col-md-4">
                                        <div class="sp-item-img">
                                            <img src={data.data.length > 0 && `https://hcmut-e-commerce.herokuapp.com/${data.data[4].product_image01}`} alt=""/>
                                        </div>
                                    </div>
                                    <div class="col-7 col-md-8">
                                        <div class="sp-item-info">
                                            <div class="sp-item-name">{data.data.length > 0 && data.data[4].product_name}</div>
                                            <p class="sp-item-description">
                                                {data.data.length > 0 && data.data[4].product_description}
                                            </p>
                                            <button class="btn-flat btn-hover">shop now</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="section">
                            <div className="container">
                                <div className="section-header">
                                    <h2>Latest product</h2>
                                </div>
                                <div className={`row ${viewBS}`}>
                                    {
                                        data.data.map((product, index) => (
                                            <div className="col-3 col-md-6 col-sm-12" key={index}>
                                                <div className="product-card">
                                                    <div className="product-card-img">
                                                        <img src={`https://hcmut-e-commerce.herokuapp.com/${product.product_image01}`} alt=""/>
                                                        <img src={`https://hcmut-e-commerce.herokuapp.com/${product.product_image02}`} alt=""/>
                                                    </div>
                                                    <div className="product-card-info">
                                                        <div className="product-btn-home">
                                                            <a href={`/shop/${product.idproduct}`} className="btn-flat btn-hover btn-shop-now">shop now</a>
                                                            <button className="btn-flat btn-hover btn-cart-add">
                                                                <i onClick={()=>AddToCart(data, product)}><BsCartPlus/></i>
                                                            </button>
                                                            <button className="btn-flat btn-hover btn-cart-add">
                                                                <i><BsHeart/></i>
                                                            </button>
                                                        </div>
                                                        <div className="product-card-name">
                                                            {product.product_name}
                                                        </div>
                                                        <div className="product-card-price">
                                                            <span><del>{formatCurrency(Number(product.product_old_price))}</del></span>
                                                            <span className="curr-price">{formatCurrency(Number(product.product_present_price))}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="section-footer">
                                    <a  className="btn-flat btn-hover" onClick={handleClickBS}>{viewBS === "" ? "Hide" : "view all"}</a>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        </ProductContext.Consumer>
    )
}