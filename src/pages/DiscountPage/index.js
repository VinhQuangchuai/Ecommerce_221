import React from "react";
import { deal } from "../../data";
import './style.css'

export const DiscountPage = () => {
    return (
        <div className="dis-wrapper">
            <div className="dis-container">
                <div className='lazy-component slide-discound-2'>
                            <div className='css-margin row'>
                                <img src='https://lh3.googleusercontent.com/yw75y5tTZPWOR4iZ76F9Tw1H3IrBGZJTpcaFWLrjRSW5ObFp9pgSWnRq-ZStYTe60bhH-t8TRqX1imI-AeIRC8Z_hVpMIBhH=rw-w0' className='col-12'/>
                            </div>
                        </div>
                <h3>Khuyến mãi</h3>

                <div className="dis-list">
                    {
                        deal.map((i, index) => (
                            <div className="list-item">
                                <div className="dis-img"><img src={i.img}/></div>
                                <span>{i.name}</span>
                                <span>{i.time}</span>
                            </div>

                        ))
                    }
                </div>
            </div>
        </div>
    )
}       