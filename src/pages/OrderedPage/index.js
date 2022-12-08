import './style.css'
import React from 'react'
import { ProductContext } from '../../components/Context'
import moment from 'moment'
import { formatCurrency } from '../../ultil'
export const OrderedPage = () => {
    // const [transInfo, setTransInfo] = useState({
    //     name: "",
    //     phone: "",
    //     id: "",
    //     address: "",
    //     city: "",
    //     district: "",
    //     wards:"",
    //     curent: "off",
    //     }}
    return (

        

        <ProductContext.Consumer>
            {
                data => (
                    <div className='order-wrapper'>
                        
                            
                            <div className='order-container'>
                               { data.ordered.map((ordered, index) => (

                                    <div className='row'>
                                        <div key={index} className="order-item col-12">
                                             <span>Tên khách hàng: {ordered.info.name}</span>
                                             <span>Thời gian: {ordered.time.format("DD-MM-YYYY")}</span>
                                             <span>CMND/CCCD: {ordered.info.id}</span>
                                             <span>Địa chỉ: {ordered.info.address}, {ordered.info.wards}, {ordered.info.district}, {ordered.info.city}</span>
                                             <span>Hình thức thanh toán: {ordered.info.current === "off" ? "Khi nhận hàng" : "Thanh toán qua ví MoMo"}</span>
                                             <span>Tổng giá trị đơn hàng: {formatCurrency(ordered.totalprice)}</span>
                                             <span>Tình trạng: Đang giao</span>
                                             {
                                                ordered.data.length > 0 && ordered.data.map((i, index) => (
                                                        <div className="cart-item" key={index}>
                                                            <div className='cart-select' style={{width: "100%"}}>
                                                                <div className='select-checkbox order'>
                                                                    <img src={`https://hcmut-e-commerce.herokuapp.com/${i.product.product_image01}`} alt="" className="produvt-thumbnail"/>
                                                                    <div className='cart_product-info'>
                                                                        <span>{i.product.product_name}</span>
                                                                        <span>{i.product.product_brand}</span>
                                                                    </div>
                                                                    <div className='cart_product-quantity'>
                                        
                                                                        <span>Số lượng: {i.quantity}</span>
                                        
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                         </div>
                                    </div>
                                    
                                
                                ))}
                            </div>
                        
                    </div>
                )
            }
        </ProductContext.Consumer>
    )
}