import React, { useState } from "react"
import { formatter } from "../../ultil"
import './style.css'
import { Link } from "react-router-dom"
import { ProductContext } from "../Context"


export const ProductGrid = (props) => {

    const [isEnter, setIsEnter] = useState("leave")
    const handleEnter = () => {
        setIsEnter("enter")
    }

    const handleLeave = () => {
        setIsEnter("leave")
    }

    const AddToCart = (data, product) => {
        data.setDataToCart({product, "quantity": 1})
    }

    return (
        <ProductContext.Consumer>
            {
                cart => (
                    <div className="productgrid-container" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
                        <div className="row">
                            <div className="col-4">
                                <img src={`https://hcmut-e-commerce.herokuapp.com/${props.product.product_image01}`} alt="" className="productgrid-thumbnail"/>
                            </div>

                            <div className="col-5 productgrid-detail">
                                <p className="product-detail__line2">{props.product.product_name}</p>
                                <p className="product-detail__line1">{props.product.product_brand}</p>
                                <p className="product-detail__line4" dangerouslySetInnerHTML={{__html: props.product.product_description}}></p>
                            </div>
                            <div className="col-3 productgrid-detail-2">
                                <p className="product-detail__line4">Availability: 599 In Stock</p>
                                <div className="product-detail__line3">
                                    <p className="product-detail__line3-current">
                                        {formatter.format(props.product.product_old_price)}
                                    </p>    
                                    <p className="product-detail__line3-discount">{formatter.format(props.product.product_present_price)}</p>
                                </div>
                                <button className="productgrid-btn" onClick={()=>AddToCart(cart, props.product)}>ADD TO CART</button>
                                        
                                <div className="productgrid-action">
                                    <Link to={`/shop/${props.product.idproduct}`}><i className="fa-solid fa-magnifying-glass"></i></Link>
                                    <Link><i className="fa-regular fa-heart"></i></Link>
                                    <Link><i className="fa-solid fa-recycle"></i></Link>
                            </div>
                                
                            </div>

                        </div>
                        {/* <button className={`product-btn ${isEnter}`}>ADD TO CART</button> */}
                    </div>
                )
            }
        </ProductContext.Consumer>
        
    )
}