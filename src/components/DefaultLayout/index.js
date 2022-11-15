import React, { useState } from "react"
import './style.css'
import { ProductContext } from "../Context"
import { ShopGrid } from "../../pages/ShopGrid"
import { getAllType, getAllBrand } from "../../ultil"

export const Defaultlayout = (props) => {

    const [brand, setBrand] = useState()
    const [type, setType] = useState()


    const handleClickBrand = (item) => {
        if (item === brand) {
            setBrand()
        }
        else setBrand(item)
    }
    const handleClickType = (item) => {
        if(item === type) {
            setType()
        }
        else setType(item)
    }


    const ProductFilter = (data) => {
        const tmp = [...data]
        if (brand) {
            if(type) {
                return tmp.filter(item => item.product_brand === brand).filter(item => item.product_type === type)
            }
            return tmp.filter(item => item.product_brand === brand)
        } 
        if (type) {
            if(brand) {
                return tmp.filter(item => item.product_brand === brand).filter(item => item.product_type === type)
            }
            return tmp.filter(item => item.product_type === type)
        } 
        else return data
    }
    return (
        <ProductContext.Consumer>
            {
                value => (
                    <div className="defaultlayout-wrapper row">
                        <div className='col-3'>
                            <div className="default-filter">
                                <span>Products</span>
                                <div className='filter-type'>

                                    {
                                        getAllType(value.data).map((i, index) => (
                                            <button className={`btn-tag ${type === i && "active-tag"}`} key={index} onClick={() => handleClickType(i)}><span>{i}</span></button>
                                        ))
                                        
                                    }
                                </div>
                                <span>Brand</span>
                                <div className='filter-type'>
                                    {
                                        getAllBrand(value.data).map((i, index) => (
                                            <button className={`btn-tag ${brand === i && "active-tag"}`} key={index} onClick={() => handleClickBrand(i)}><span>{i}</span></button>
                                        ))
                                        
                                    }
                                </div>
                            </div>
                        </div>
                    
                        <div className="default-content col-9">
                            <div>
                                <ShopGrid props={ProductFilter(value.data)}/>
                            </div>
                        </div>
                    </div>
                )
            }
            
        </ProductContext.Consumer>
    )
}