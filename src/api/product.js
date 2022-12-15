// import React, {useState, useEffect} from "react";
import axios from 'axios'

export const getProductById = (id) => axios.get(`https://hcmut-e-commerce.herokuapp.com/api/product/detail/${id}`)

export const fetchPosts = () => axios.get("https://hcmut-e-commerce.herokuapp.com/api/product/getall")

export const getPayment = (amount) => axios.post("https://hcmut-e-commerce.herokuapp.com/api/payment", amount)

export const sendMail = (data) => axios.post("https://hcmut-e-commerce.herokuapp.com/api/send-mail", data)

// export const getProductById = (id) => axios.get(`http://localhost:3001/api/product/detail/${id}`)

// export const fetchPosts = () => axios.get("http://localhost:3001/api/product/getall")

// export const getPayment = (amount) => axios.post("http://localhost:3001/api/payment", amount)

// export const sendMail = (data) => axios.post("http://localhost:3001/api/send-mail", data)
