import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { getProductById } from '../../api/product';
import { BsFillStarFill, BsCartPlus, BsHeart } from 'react-icons/bs';
import { BiChevronsRight, BiPlus, BiMinus, BiChevronRight, BiChevronLeft } from 'react-icons/bi';
import { ProductContext } from '../../components/Context';
import '../../assets/css/index.css'
import '../../assets/css/grid.css';
import '../../assets/css/fonts.css';
import { Link } from 'react-router-dom';

export const ProductPage = () => {

    const [isActive, setActive] = React.useState(false);
    const [product, setProduct] = React.useState();

    const imgRef = React.createRef();
    const match = useParams({id: Number})
    useEffect(() => {
        getProductById(match.id).then(res => setProduct(res.data))
    }, [match.id])

    const AddToCart = (func) => {
        func.setDataToCart({product, "quantity": 1})
    }


    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
    },[match.id])

    return (
        <ProductContext.Consumer>
            {
                data => (
                    <div className="bg-main">
                        <div className="container">
                            <div className="box">
                                <div className="breadcumb">
                                    <a href="/#">home</a>
                                    <span><BiChevronsRight /></span>
                                    <a href="/shop">shop</a>
                                    <span><BiChevronsRight /></span>
                                    <a href="#">{product && product.product_name}</a>
                                </div>
                            </div>
                            <div className="row product-row">
                                <div className="col-5 col-md-12">
                                    <div className="product-img" id="product-img">
                                        <img src={product && `https://hcmut-e-commerce.herokuapp.com/${product.product_image01}`} alt="" ref={imgRef}/>
                                    </div>
                                    <div className="box">
                                        <div className="product-img-list">
                                            <div className="product-img-item">
                                                <img src={product && `https://hcmut-e-commerce.herokuapp.com/${product.product_image02}`} alt="" onClick={
                                                (e) => {
                                                    let img = e.target.getAttribute('src');
                                                    imgRef.current.setAttribute('src', img);
                                                }}/>
                                            </div>
                                            <div className="product-img-item">
                                                <img src={product && `https://hcmut-e-commerce.herokuapp.com/${product.product_image03}`} alt="" onClick={
                                                (e) => {
                                                    let img = e.target.getAttribute('src');
                                                    imgRef.current.setAttribute('src', img);
                                                }}/>
                                            </div>
                                            <div className="product-img-item">
                                                <img src={product && `https://hcmut-e-commerce.herokuapp.com/${product.product_image01}`} alt="" onClick={
                                                (e) => {
                                                    let img = e.target.getAttribute('src');
                                                    imgRef.current.setAttribute('src', img);
                                                }}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-7 col-md-12">
                                    <div className="product-info">
                                        <h1>
                                            {product && product.product_name}
                                        </h1>
                                        <div className="product-info-detail">
                                            <span className="product-info-detail-title">Brand: </span>
                                            <a href="/#">{product && product.product_name}</a>
                                        </div>
                                        <div className="product-info-detail">
                                            <span className="product-info-detail-title">Rated: </span>
                                            <span className="rating">
                                                <i><BsFillStarFill/></i>
                                                <i><BsFillStarFill/></i>
                                                <i><BsFillStarFill/></i>
                                                <i><BsFillStarFill/></i>
                                                <i><BsFillStarFill/></i>
                                            </span>
                                        </div>
                                        <p className="product-description">
                                            {product && product.product_description}       
                                        </p>
                                        <div className="product-info-price">$ {product && product.product_present_price}</div>
                                        <div className="product-quantity-wrapper">
                                            <span className="product-quantity-btn">
                                                <BiMinus/>
                                            </span>
                                            <span className="product-quantity">1</span>
                                            <span className="product-quantity-btn">
                                                <BiPlus/>
                                            </span>
                                        </div>
                                        <div>
                                            <button className="btn-flat btn-hover" onClick={() => AddToCart(data)}>add to cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="box">
                                <div className="box-header">
                                    description
                                </div>
                                <div className="product-detail-description">
                                    <button className="btn-flat btn-hover btn-view-description" id="view-all-description" onClick={(e) => {
                                        setActive(!isActive);
                                        if (isActive === false) e.target.innerHTML = "view less";
                                        else e.target.innerHTML = "view all";
                                    }}>
                                        view all
                                    </button>
                                    <div className={isActive ? "product-detail-description-content active" : "product-detail-description-content"}>
                                        <p>
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit laudantium obcaecati odit dolorem, doloremque accusamus esse neque ipsa dignissimos saepe quisquam tempore perferendis deserunt sapiente! Recusandae illum totam earum ratione.
                                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam incidunt maxime rerum reprehenderit voluptas asperiores ipsam quas consequuntur maiores, at odit obcaecati vero sunt! Reiciendis aperiam perferendis consequuntur odio quas. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut quaerat eum veniam doloremque nihil repudiandae odio ratione culpa libero tempora. Expedita, quo molestias. Minus illo quis dignissimos aliquid sapiente error!
                                        </p>
                                        <img src={product && `https://hcmut-e-commerce.herokuapp.com/${product.product_image01}`} />

                                        <p>
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis accusantium officia, quae fuga in exercitationem aliquam labore ex doloribus repellendus beatae facilis ipsam. Veritatis vero obcaecati iste atque aspernatur ducimus.
                                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat quam praesentium id sit amet magnam ad, dolorum, cumque iste optio itaque expedita eius similique, ab adipisci dicta. Quod, quibusdam quas. Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, in corrupti ipsam sint error possimus commodi incidunt suscipit sit voluptatum quibusdam enim eligendi animi deserunt recusandae earum natus voluptas blanditiis?
                                        </p>
                                        <img src={product && `https://hcmut-e-commerce.herokuapp.com/${product.product_image01}`} />

                                        <p>
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi ullam quam fugit veniam ipsum recusandae incidunt, ex ratione, magnam labore ad tenetur officia! In, totam. Molestias sapiente deserunt animi porro?
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="box">
                                <div className="box-header">
                                    review
                                </div>
                                <div>
                                    <div className="user-rate">
                                        <div className="user-info">
                                            <div className="user-avt">
                                                <img src={"https://htmldemo.net/abelo/abelo/assets/images/product-image/17.jpg"} alt=""/>
                                            </div>
                                            <div className="user-name">
                                                <span className="name">John Doe</span>
                                                <span className="rating">
                                                    <i><BsFillStarFill/></i>
                                                    <i><BsFillStarFill/></i>
                                                    <i><BsFillStarFill/></i>
                                                    <i><BsFillStarFill/></i>
                                                    <i><BsFillStarFill/></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="user-rate-content">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio ea iste, veritatis nobis amet illum, cum alias magni dolores odio, eius quo excepturi veniam ipsa voluptatibus natus voluptas vero? Aspernatur!
                                        </div>
                                    </div>
                                    <div className="user-rate">
                                        <div className="user-info">
                                            <div className="user-avt">
                                                <img src={"https://htmldemo.net/abelo/abelo/assets/images/product-image/17.jpg"} alt=""/>
                                            </div>
                                            <div className="user-name">
                                                <span className="name">Volume</span>
                                                <span className="rating">
                                                    <i><BsFillStarFill/></i>
                                                    <i><BsFillStarFill/></i>
                                                    <i><BsFillStarFill/></i>
                                                    <i><BsFillStarFill/></i>
                                                    <i><BsFillStarFill/></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="user-rate-content">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio ea iste, veritatis nobis amet illum, cum alias magni dolores odio, eius quo excepturi veniam ipsa voluptatibus natus voluptas vero? Aspernatur!
                                        </div>
                                    </div>
                                    <div className="user-rate">
                                        <div className="user-info">
                                            <div className="user-avt">
                                                <img src={"https://htmldemo.net/abelo/abelo/assets/images/product-image/17.jpg"} alt=""/>
                                            </div>
                                            <div className="user-name">
                                                <span className="name">Scarlet</span>
                                                <span className="rating">
                                                    <i><BsFillStarFill/></i>
                                                    <i><BsFillStarFill/></i>
                                                    <i><BsFillStarFill/></i>
                                                    <i><BsFillStarFill/></i>
                                                    <i><BsFillStarFill/></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="user-rate-content">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio ea iste, veritatis nobis amet illum, cum alias magni dolores odio, eius quo excepturi veniam ipsa voluptatibus natus voluptas vero? Aspernatur!
                                        </div>
                                    </div>
                                    <div className="user-rate">
                                        <div className="user-info">
                                            <div className="user-avt">
                                                <img src={"https://htmldemo.net/abelo/abelo/assets/images/product-image/17.jpg"} alt=""/>
                                            </div>
                                            <div className="user-name">
                                                <span className="name">Vesti</span>
                                                <span className="rating">
                                                    <i><BsFillStarFill/></i>
                                                    <i><BsFillStarFill/></i>
                                                    <i><BsFillStarFill/></i>
                                                    <i><BsFillStarFill/></i>
                                                    <i><BsFillStarFill/></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="user-rate-content">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio ea iste, veritatis nobis amet illum, cum alias magni dolores odio, eius quo excepturi veniam ipsa voluptatibus natus voluptas vero? Aspernatur!
                                        </div>
                                    </div>
                                    <div className="user-rate">
                                        <div className="user-info">
                                            <div className="user-avt">
                                                <img src={"https://htmldemo.net/abelo/abelo/assets/images/product-image/17.jpg"} alt=""/>
                                            </div>
                                            <div className="user-name">
                                                <span className="name">Elysia</span>
                                                <span className="rating">
                                                    <i><BsFillStarFill/></i>
                                                    <i><BsFillStarFill/></i>
                                                    <i><BsFillStarFill/></i>
                                                    <i><BsFillStarFill/></i>
                                                    <i><BsFillStarFill/></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="user-rate-content">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio ea iste, veritatis nobis amet illum, cum alias magni dolores odio, eius quo excepturi veniam ipsa voluptatibus natus voluptas vero? Aspernatur!
                                        </div>
                                    </div>
                                    <div className="box">
                                        <ul className="pagination">
                                            <li><a href="/#"><BiChevronLeft/></a></li>
                                            <li><a href="/#" className="active">1</a></li>
                                            <li><a href="/#">2</a></li>
                                            <li><a href="/#">3</a></li>
                                            <li><a href="/#">4</a></li>
                                            <li><a href="/#">5</a></li>
                                            <li><a href="/#"><BiChevronRight/></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="box">
                                <div className="box-header">
                                    related products
                                </div>
                                <div className="row" id="related-products">
                                    {
                                        [...data.data].filter(i => i.idproduct < 5).map((product, index) => (
                                            <div className="col-3 col-md-6 col-sm-12" key={index}>
                                                <div className="product-card">
                                                    <div className="product-card-img">
                                                        <img src={`https://hcmut-e-commerce.herokuapp.com/${product.product_image01}`} alt=""/>
                                                        <img src={`https://hcmut-e-commerce.herokuapp.com/${product.product_image02}`} alt=""/>
                                                    </div>
                                                    <div className="product-card-info">
                                                        <div className="product-btn-home">
                                                            <Link to={`/shop/${product.idproduct}`}><span className="btn-flat btn-hover btn-shop-now">shop now</span></Link>
                                                            <button className="btn-flat btn-hover btn-cart-add">
                                                                <i><BsCartPlus/></i>
                                                            </button>
                                                            <button className="btn-flat btn-hover btn-cart-add">
                                                                <i><BsHeart/></i>
                                                            </button>
                                                        </div>
                                                        <div className="product-card-name">
                                                            {product.product_name}
                                                        </div>
                                                        <div className="product-card-price">
                                                            <span><del>${product.product_old_price}</del></span>
                                                            <span className="curr-price">${product.product_present_price}</span>
                                                        </div>
                                                    </div>
                                                </div>
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
    );
}