import './style.css'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
    const [type, setType] = useState("password");
    const [username, setUsename] = useState("");
    const [password, setPassword] = useState("");
    const navigator = useNavigate()

    const handleChange = () => {
        if(type === "password") {
            setType("text")
        }
        else {
            setType("password")
        }
    }

    const [err, setErr] = useState({
        userErr: "",
        passErr: ""
    })

    const handleClick = () => {
        if(username === "") {
            setErr({...err, "userErr": "*vui lòng điền tên đăng nhập"})
        }
        else if(password.length < 8) {
            setErr({...err, "passErr": "*mật khẩu phải có ít nhất 8 kí tự"})
        }
        else {
            localStorage.setItem('current-user', JSON.stringify({username, password}))
            navigator('/cart')
        }
    }

    const handleUser = (e) => {
        setUsename(e)
        setErr({
            userErr: "",
            passErr: ""
        })
    }
    const handlePass = (e) => {
        setPassword(e)
        setErr({
            userErr: "",
            passErr: ""
        })
    }

    return (
        <div className='login-wrapper'>
            <div className='login-container row'>
                <span className='login-header'>Chào mừng đến với Abelo! Đăng nhập ngay!</span>   
                <div className='login-input col-7'>
                    <span>Số điện thoại hoặc email</span>
                    <input type="text" placeholder='Vui lòng nhập số điện thoại hoặc email của bạn' onChange={(e) => handleUser(e.target.value)}/>
                    <span className='error'>{err.userErr}</span>
                    <span>Mật khẩu</span>
                    <input type={type} placeholder='Vui lòng nhập mật khẩu của bạn'  onChange={(e) => handlePass(e.target.value)}/>
                    <span className='error'>{err.passErr}</span>
                    <div className='login-check'>
                        <input type="checkbox" onChange={handleChange}/>
                        <span>Hiện mật khẩu</span>
                    </div>
                </div>
                <div className='login-btn col-5'>
                    <button className='btn btn-primary' onClick={handleClick}>ĐÂNG NHẬP</button>
                    <span>Hoặc</span>  
                    <button className='btn btn-warning' onClick={handleClick}>Đăng kí</button>
                </div>
            </div> 
        </div>
    )
}