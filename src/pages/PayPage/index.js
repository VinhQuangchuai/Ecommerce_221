import './style.css'
import React, { useEffect } from 'react'
import { ProductContext } from '../../components/Context'
import { formatter } from '../../ultil'
import { voucherlist } from '../CartPage'
import { useState } from 'react'
import { formatCurrency } from '../../ultil'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import moment from 'moment'

export const PayPage = () => {
    
    const [transInfo, setTransInfo] = useState({
        name: "",
        phone: "",
        id: "",
        address: "",
        city: "",
        district: "",
        wards:"",
        curent: "off",
        })

    const navigate = useNavigate()


    const [voucher, setVoucher] = useState()
    const [current, setCurrent] = useState("off")
    const [role, setRole] = useState(false)
    const total = (cart) => {
        var total = 0
        // console.log(cart.cart)
        cart.payment.forEach(i => (
            total += Number(i.product.product_present_price)
        ))
        
        console.log(total)
        return total
    }

    const getTrans = (cart) => {
        return total(cart)*0.01
    }

    const getTotal = (cart) => {
        var sum = 0
        voucherlist.forEach(i => {
            if (i.code === voucher) {
                sum -= i.price
            }
        })

        sum += getTrans(cart) + total(cart)
        return sum
    }

    const handleDelete = (cart, item) => {
        cart.setPayment(cart.payment.filter(i => i.product.product_name !== item.product.product_name ))
    }

    const handleClick = (cart) => {
        if(role) {
            alert("Mua hàng thành công")
            cart.setToOrdered({data: cart.payment, info: transInfo, time: moment(), totalprice: getTotal(cart)})
            cart.setCart(cart.tmpcart)
            cart.setPayment([])
            setRole(false)
            navigate('/cart')
        }
    }
    console.log(transInfo)


    const handleChange = () => {
        setRole(!role)
    }

    return (
        <ProductContext.Consumer>
            {
                cart => (
                    <div className='paypage-wrapper'>
                        <div className='paypage'>
                            <div className='row'>
                                <div className='col-7 row'>
                                    <span className='pay-span'>Vui lòng nhập thông tin giao hàng </span>
                                    <div className='col-6 user-infor'>
                                        <div>
                                            <span>Họ và tên</span>
                                            <input type="text" placeholder='Họ và tên' onChange={(e) => setTransInfo({...transInfo, "name": e.target.value})}/>
                                        </div>
                                        <div>
                                            <span>Số điện thoại</span>
                                            <input type="text" placeholder='Số điện thoại' onChange={(e) => setTransInfo({...transInfo, "phone": e.target.value})}/>
                                        </div>
                                        <div>
                                            <span>Số CMND/ CCCD</span>
                                            <input type="text" placeholder='Số CMND/ CCCD' onChange={(e) => setTransInfo({...transInfo, "id": e.target.value})}/>
                                        </div>
                                    </div>
                                    <div className='col-6 user-infor'>
                                        <div>
                                            <span>Địa chỉ nhận hàng</span>
                                            <input type="text" placeholder='Vui lòng nhập địa chỉ của bạn' onChange={(e) => setTransInfo({...transInfo, "address": e.target.value})}/>
                                        </div>
                                        <div>
                                            <span>Tỉnh/ Thành phố</span>
                                            <select class="form-select" aria-label="Default select example" onChange={(e) => setTransInfo({...transInfo, "city": e.target.value})}>
                                                <option selected>Vui lòng chọn tỉnh/ thành phố</option>
                                                <option value="Thành phố Hồ Chí Minh">Thành phố Hồ Chí Minh</option>
                                            </select>
                                        </div>
                                        <div>
                                            <span>Quận/ Huyện</span>
                                            <select class="form-select" aria-label="Default select example" onChange={(e) => setTransInfo({...transInfo, "district": e.target.value})}>
                                                <option selected>Vui lòng chọn quận/ huyện</option>
                                                <option value="Thủ Đức">Thủ Đức</option>
                                            </select>
                                        </div>
                                        <div>
                                            <span>Phường/ Xã</span>
                                            <select class="form-select" aria-label="Default select example" onChange={(e) => setTransInfo({...transInfo, "wards": e.target.value})}>
                                                <option selected>Vui lòng chọn phường/ xã</option>
                                                <option value="Linh Trung">Linh Trung</option>
                                                <option value="Linh Tây">Linh Tây</option>
                                                <option value="Linh Đông">Linh Đông</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <span className='pay-span'>Gói hàng</span>
                                        {
                                            cart.payment.length > 0 && cart.payment.map((i, index) => (
                                                <div className="cart-item" key={index}>
                                                    <div className='cart-select' style={{width: "100%"}}>
                                                        <div className='select-checkbox pay-check'>
                                                            <img src={`https://hcmut-e-commerce.herokuapp.com/${i.product.product_image01}`} alt="" className="produvt-thumbnail"/>
                                                            <div className='cart_product-info'>
                                                                <span>{i.product.product_name}</span>
                                                                <span>{i.product.product_brand}</span>
                                                                <span className='discount-info'>Mua 3, giảm 2%</span>
                                                            </div>
                                                            <div className='cart_product-quantity paypage-price'>
                                                                <div className="product-detail__line3 paypage-price">
                                                                    <p className="product-detail__line3-discount">{formatter.format(i.product.product_present_price)}</p>
                                                                    {
                                                                        i.product.product_present_price &&
                                                                        <p className="product-detail__line3-current">
                                                                            {formatter.format(i.product.product_old_price)}
                                                                        </p>
                                                                    }
                        
                                                                </div>
                        
                                                            </div>
                                                            <span>Số lượng: {i.quantity}</span>

                                                        </div>
                                                    </div>
                                                
                        
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className='col-5 pay-bill'>
                                        <button className='btn btn-warning'>
                                            Đặt hàng
                                        </button>
                                        
                                        <div className={`payment-choose ${transInfo.curent === "off" && 'pay-active'}`} onClick={()=> setTransInfo({...transInfo, "curent": "off"})}>
                                            <img src='https://lzd-img-global.slatic.net/g/tps/tfs/TB1ZP8kM1T2gK0jSZFvXXXnFXXa-96-96.png_2200x2200q75.jpg_.webp' />
                                            <span>Thanh toán khi nhận hàng</span>
                                        </div>
                                        <div className={`payment-choose ${transInfo.curent === "on" && 'pay-active'}`} onClick={()=> setTransInfo({...transInfo, "curent": "on"})}>
                                            <img src='https://lzd-img-global.slatic.net/g/tps/tfs/TB1Iey_osKfxu4jSZPfXXb3dXXa-96-96.png_2200x2200q75.jpg_.webp'/>
                                            <span>Thanh toán qua ví MoMo</span>
                                        </div>
                                        <span>Thông tin đơn hàng</span>
                                        <div className='cart-detail'>
                                            <span>Tạm tính ({cart.payment.length} sản phẩm)</span>
                                            <span>{formatCurrency(total(cart))}</span>
                                        </div>
                                        <div className='cart-detail'>
                                            <span>Phí vận chuyển</span>
                                            <span>{formatCurrency(getTrans(cart))}</span>
                                        </div>
                                        <div className='cart-detail'>
                                            <span>Chọn mã giảm giá</span>
                                        </div>
                                        <div className="input-group mb-3">
                                            <select className="form-select" aria-label="Default select example" onChange={(e) => setVoucher(e.target.value)}>
                                                <option value="">Không sử dụng</option>
                                                {
                                                    voucherlist.map((i, index) => (
                                                        <option key={index} value={i.code}>
                                                            {i.code}
                                                        </option>
                                                    ))
                        
                                                }
                                            </select>
                                            <button className="btn btn-outline-primary" type="button" id="button-addon2">Áp dụng</button>
                                            </div>
                                        <div className='cart-detail' style={{paddingBottom: "16px"}}>
                                            <strong>Tổng cộng</strong>
                                            <strong>{formatCurrency(getTotal(cart))}</strong>
                                        </div>
                                        
                                        <div className='role-check'>
                                            <input type="checkbox" checked={role} onChange={handleChange}/>
                                            <span>Tôi đồng ý với các chính sách của Abelo.</span>
                                            <Link to="/policy"><span className='role'>Xem chính sách</span></Link>
                                        </div>

                                        
                                            <button className='btn btn-warning' style={{width: "100%" }} onClick={()=>handleClick(cart)}>
                                                Đặt hàng
                                            </button>
                                        
                                        <Link to='/cart'>
                                            <button className='btn btn-primary' style={{marginTop: "10px", width: "100%" }}>
                                                Quay lại giỏ hàng
                                            </button>
                                        </Link>
                                        
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </ProductContext.Consumer>
        
    )
}