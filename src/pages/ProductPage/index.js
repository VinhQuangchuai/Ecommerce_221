import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { getProductById } from '../../api/product';
import { BiChevronsRight} from 'react-icons/bi';
import { ProductContext } from '../../components/Context';
import './style.css'
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../ultil';
import { formatter } from '../../ultil';
import { Product } from '../../components/Product';

export const ProductPage = () => {

    const [isActive, setActive] = React.useState(false);
    const [product, setProduct] = React.useState();

    const navigator = useNavigate()
    const imgRef = React.createRef();
    const match = useParams({id: Number})
    useEffect(() => {
        getProductById(match.id).then(res => setProduct(res.data))
    }, [match.id])

    const AddToCart = (func) => {
            func.setDataToCart({product, "quantity": 1})
            alert('Thêm thành công')
        
    }

    const handleClick = (func) => {
        func.setDataToCart({product, "quantity": 1})
        alert('Thêm thành công')
        navigator('/cart')
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
                    product && <div className="bg-main">
                        <div className="box">
                            <div className="breadcumb">
                                <a href="/#">home</a>
                                <span><BiChevronsRight /></span>
                                <a href="/shop">shop</a>
                                <span><BiChevronsRight /></span>
                                <a href="#">{product && product.product_name}</a>
                            </div>
                            <div className='page-bg-second row'>
                                <div className='page-bg-second__left col-8 row'>
                                    <div className='left-content col-5'>
                                        <img src={`https://hcmut-e-commerce.herokuapp.com/${product.product_image01}`} />
                                        <div className='left-list'>
                                            <img src={`https://hcmut-e-commerce.herokuapp.com/${product.product_image01}`} className="img-active" />
                                            <img src={`https://hcmut-e-commerce.herokuapp.com/${product.product_image02}`} />
                                            <img src={`https://hcmut-e-commerce.herokuapp.com/${product.product_image03}`} />
                                        </div>
                                    </div>
                                    <div className='right-content col-7'>
                                        <h5>{product.product_name}</h5>
                                        <span>Thương hiệu: <strong>{product.product_brand}</strong> | COD: {product.product_code}</span>
                                        <div style={{position: "relative", paddingTop: "15px"}} >
                                            <div>
                                                <p className="product-detail__line3-discount page-cost">{formatter.format(product.product_present_price)}</p>
                                                <p className="product-detail__line3-current">{formatter.format(product.product_old_price)}</p>
                                            </div>
                                            <div className='product-disc page-save'>
                                                <span>TIẾT KIỆM</span>
                                                <span>{formatter.format(product.product_old_price - product.product_present_price)}</span>
                                            </div>
                                        </div>
                                        <div className='page-gift row'>
                                            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA8KquRN0t5XheoEE2Fydt-9tEPn7zn_V7PA&usqp=CAU' className='col-2'/>
                                            <div className='gift-inf col-10'>
                                                <span>Giảm {formatter.format(product.product_old_price - product.product_present_price)} (áp dụng vào giá sản phẩm)</span>
                                                <span>Khuyến mãi áp dụng khi mua sản phẩm, khác nhau với từng sản phẩm</span>
                                                <br/>
                                                <span>HSD: Không giới hạn</span>
                                            </div>
                                        </div>
                                        <div className='page-button row'>
                                            <button type="button" class="btn btn-primary col-5" onClick={() => handleClick(data)}>Mua ngay</button>
                                            <button type="button" class="btn btn-primary col-5" onClick={() => AddToCart(data)}>Thêm vào giỏ hàng</button>
                                        </div>
                                    </div>
                                </div>
                                <div className='page-bg-second__right col-3'>
                                    <h5>Chính sách bán hàng</h5>
                                    <span>
                                        <i className="fa-solid fa-check"></i>
                                        Free lắp đặt cho đơn từ 2 triệu
                                    </span>
                                    <span>
                                        <i className="fa-solid fa-shield"></i>
                                        Cam kết hàng chính hãng 100%
                                    </span>
                                    <span>
                                        <i class="fa-solid fa-rotate"></i>
                                        Đổi trả trong vòng 10 ngày
                                    </span>
                                    <span>Xem chi tiết</span>

                                </div>
                            </div>
                            <div className='page-bg-third row'>
                                    <div className='col-7'>
                                        <p>Mô tả sản phẩm</p>
                                        <span>{product.product_description} {product.product_description} {product.product_description}</span>
                                        <img src={`https://hcmut-e-commerce.herokuapp.com/${product.product_image01}`} />
                                        <span>{product.product_description} {product.product_description} {product.product_description}</span>


                                        <img src={`https://hcmut-e-commerce.herokuapp.com/${product.product_image02}`} />
                                        <span>{product.product_description} {product.product_description} {product.product_description}</span>


                                        <img src={`https://hcmut-e-commerce.herokuapp.com/${product.product_image03}`} />

                                    </div>
                                    <div className='pg-detail col-5'>
                                        <p>Thông tin chi tiết</p>
                                        <div className='detail-1'>
                                            <div>
                                                <span>Thương hiệu</span>
                                                <span>{product.product_brand}</span>
                                            </div>
                                            <div className='odd'>
                                                <span>Bảo hành</span>
                                                <span>36</span>
                                            </div>
                                            <div>
                                                <span>Thông tin chung</span>
                                            </div>
                                            <div className='odd'> 
                                                <span>Nhu cầu</span>
                                                <span>Gaming, Văn phòng, Đồ họa - Kỹ thuật, Doanh nghiệp, Học sinh - Sinh viên</span>
                                            </div>
                                            <div>
                                                <span>Cấu hình chi tiết</span>
                                            </div>
                                            <div className='odd'>
                                                <span>Chipset</span>
                                                <span>Đang cập nhật</span>
                                            </div>
                                            <div>
                                                <span>Socket</span>
                                                <span>Đang cập nhật</span>
                                            </div>
                                            <div className='odd'>
                                                <span>Kích thước</span>
                                                <span>Đang cập nhật</span>
                                            </div>
                                            <div>
                                                <span>Khe RAM tối đa</span>
                                                <span>Đang cập nhật</span>
                                            </div>
                                            <div className='odd'>
                                                <span>Kiểu RAM hỗ trợ</span>
                                                <span>Đang cập nhật</span>
                                            </div>
                                            <div>
                                                <span>Lưu trữ</span>
                                                <span>Đang cập nhật</span>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            <div className='orther-product' style={{paddingBottom: "0"}}>
                                <div className='css-margin'>
                                    <h5>Sản phẩm liên quan
                                    </h5>

                                <div className='listproduct row'>
                                    {
                                        data.data.filter(i => i.product_type === product.product_type).slice(0,4).map((i, index) => (
                                            <div key={index} className="lazy-product col-3">
                                                <Product product={i}/>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        </div>

                    </div>
                )
            }
        </ProductContext.Consumer>
    );
}