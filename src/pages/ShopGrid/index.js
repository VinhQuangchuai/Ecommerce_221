import './style.css'
import { products } from '../../data'
import React, { useState, useEffect } from 'react'
import { Product } from '../../components/Product'
import { ProductGrid } from '../../components/ProductGrid'
import { ProductContext } from '../../components/Context'

export const ShopGrid = (props) => {

    const [grid, setGrid] = useState("grid")
    const [sortby, setSortBy] = useState(1)

    const handleChange = (e) => {
        setSortBy(e.target.value)
    }

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
    },[])

    return (
        <ProductContext.Consumer>
            {
                data => (
                    <div className='shopgrid-wrapper'>
                        <div className='default-content-filter'>
                            <div className='display-icon'>
                                <i className={`fa-solid fa-grip ${grid === "grid" && "active"}`} onClick={() => setGrid("grid")}></i>
                                <i className={`fa-solid fa-list ${grid === "list" && "active"}`} onClick={() => setGrid("list")}></i>
                            </div>
                            <span>There are {`${props.props.length}`} Products.</span>
                            <div className="shop-select">
                                <label className='shop-product'>Sort by</label>
                                <select onChange={handleChange} value={sortby}>
                                    <option value="1">A - Z</option>
                                    <option value="2">Z - A</option>
                                    <option value="3">In stock</option>
                                </select>
                            </div>
                        </div>
                        <div className='row'>
                            {
                                props.props.map((item, index) => (
                                    grid === "grid" ?
                                        <div className='col-4' key={index}>
                                            <Product product={item} />
                                        </div> :
                                        <div className='col-12' key={index}>
                                            <ProductGrid product={item} />
                                        </div>
                                ))
                            }
                        </div>
                    </div>
                )
            }
        </ProductContext.Consumer>
        
    )
}