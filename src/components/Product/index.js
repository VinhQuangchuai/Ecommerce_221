import React, {useState, useEffect} from 'react'
import { formatter } from '../../ultil'
import './style.css'
import { Link } from "react-router-dom";




export const Product = (props) => {

    const [isEnter, setIsEnter] = useState("leave")

    const handleEnter = () => {
        setIsEnter("enter")
    }

    const handleLeave = () => {
        setIsEnter("leave")
    }


    return (
        <div className="product-container" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
            <div className="product-wrapper">
                <img src={`https://hcmut-e-commerce.herokuapp.com/${props.product.product_image01}`} alt="" className="produvt-thumbnail"/>
                <div className="product-detail">
                    <p className="product-detail__line1">{props.product.product_brand}</p>
                    <p className="product-detail__line2">{props.product.product_name}</p>
                    <div className="product-detail__line3">
                        
                        {
                            props.product.product_present_price && 
                            <p className="product-detail__line3-current">
                                {formatter.format(props.product.product_old_price)}
                            </p>
                        }
                        <p className="product-detail__line3-discount">{formatter.format(props.product.product_present_price)}</p>
                    </div>
                </div>
                <div className={`product-action ${isEnter}`}>
                    <Link to={`/shop/${props.product.idproduct}`}><i className="fa-solid fa-magnifying-glass"></i></Link>
                    <Link><i className="fa-regular fa-heart"></i></Link>
                    <Link><i className="fa-solid fa-recycle"></i></Link>
                </div>
            </div>
            <div className={`product-btn ${isEnter}`}>
                <Link>
                    <button>ADD TO CART</button>
                </Link>
            </div>

        </div>
    )
}