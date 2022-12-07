import './style.css'
import React, { useState } from 'react'
import { formatCurrency } from '../../ultil'
import { ProductContext } from '../../components/Context'


const voucherlist = [
    {
        code: "VOUCHER2022",
        price: 20000
    },
    {
        code: "VOUCHERNOEL",
        price: 15000
    }
]



export const CartPage = () => {

    
    const [voucher, setVoucher] = useState()
    const [checked, setChecked] = useState(false)
    // const [data, setData] = useState(product)
    const [select, setSelect] = useState([])

    const total = (cart) => {
        var total = 0
        // console.log(cart.cart)
        cart.cart.forEach(i => (
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


    // const [theArrayOfObjects, setTheArrayOfObjects] = useState([
    //     { color: "blue", shape: "square" }, 
    //     { color: "red", shape: "circle" }
    //     ]);

    // const updateShape = (shape, index) => {
    //         setTheArrayOfObjects(state => state.map((el, i) => i === index
    //           ? { ...el, shape }
    //           : el,
    //          ));
    //       };
        
    const check = (item) => {
        if(checked) {
            return true
        }
        var selected = select.find(i => i.product.product_name === item.product.product_name)
        if (selected === undefined) {
            return false
        }
        else {
            return true
        }
    }
    

    // const handleCLick = () => {
    //     updateShape("rectangle", 1);
    // }

    const handleChange = (item) => {
        setChecked(false)
        var selected = select.find(i => i.product.product_name === item.product.product_name)
        if (selected === undefined) {
            setSelect([...select, item])
        }
        else {
            setSelect(select.filter(i => i.product.product_name != item.product.product_name))
        }
    }

    const handelDelete = (item, cart) => {
        var selected = select.find(i => i.product.product_name === item.product.product_name)
        cart.setCart(cart.cart.filter(i => i.product.product_name !== item.product.product_name))
        setSelect(select.filter(i => i.product.product_name !== item.product.product_name))
    }

    const handleChangeAll = (cart) => {
        setChecked(!checked)
        if (!checked) {
            setSelect(cart.cart)

        }
        else setSelect([])
    }


    return (
        <ProductContext.Consumer>
            {
                cart => (
                    <div className='cart-wrapper'>
                        {
                            cart.cart.length < 1 ?
                                    <div className='cart-page__empty'>
                                        <span style={{marginBottom: "27px"}}>
                                            Không có sản phẩm nào trong giỏ hàng
                                        </span>
                                        <button type="button" class="btn btn-outline-warning"><a href="/">TIẾP TỤC MUA SẮM</a></button>
                                    </div> :
                                    <div className='cart-page row'>
                            <div className='cart-page__container col-7  '>
                                {
                                    <div className='cart-page__pay'>
                                            <div className="cart-item first">
                                                <div className='cart-select' style={{width: "100%"}}>
                                                    <div className='select-checkbox'>
                                                        <input type="checkbox" onChange={() => handleChangeAll(cart)} checked={checked}/>
                                                        <span>CHỌN TẤT CẢ ({cart.cart.length} SẢN PHẨM)</span>
                                                    </div>
                                                </div>
                                                <i className="fa-solid fa-trash"></i>
                                            </div>
                                            {
                                                cart.cart.length > 0 && cart.cart.map((i, index) => (
                                                    <div className="cart-item" key={index}>
                                                        <div className='cart-select' style={{width: "100%"}}>
                                                            <div className='select-checkbox'>
                                                                <input type="checkbox" checked={check(i)} onChange={() =>handleChange(i)}/>
                                                                
                                                                <img src={`https://hcmut-e-commerce.herokuapp.com/${i.product.product_image01}`} alt="" className="produvt-thumbnail"/>
                                                                <div className='cart_product-info'>
                                                                    <span>{i.product.product_name}</span>
                                                                    <span>{i.product.product_brand}</span>
                                                                    <span className='discount-info'>Mua 3, giảm 2%</span>
                                                                </div>
                                                                <div className='cart_product-quantity'>
                                                                    <button className='btn btn-outline-primary'>-</button>
                                                                    <span>{i.quantity}</span>
                                                                    <button className='btn btn-outline-primary'>+</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <i className="fa-solid fa-trash"  onClick={() => handelDelete(i, cart)}></i> 
                                                       
                                                    </div>
                                                ))
                                            }
                                        </div>
                                }
                            </div>
                            {
                                <div className='cart-page__cart'>
                                        <span>Thông tin đơn hàng</span>
                                        <div className='cart-detail'>
                                            <span>Tạm tính ({cart.cart.length} sản phẩm)</span>
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
                                        <button type="button" className="btn btn-outline-primary col-12" >Xác nhận giỏ hàng ({cart.cart.length})</button>
                                        {/* onClick={handleCLick} */}
                                    </div>
                                    }
                        </div>
                        }
                        
                    </div>
                )
            }
        </ProductContext.Consumer>
        
    )
}