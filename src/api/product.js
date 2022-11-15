import React, {useState, useEffect} from "react";
import axios from 'axios'

export const getProductById = (id) => axios.get(`https://hcmut-e-commerce.herokuapp.com/api/product/detail/${id}`)

export const fetchPosts = () => axios.get("https://hcmut-e-commerce.herokuapp.com/api/product/getall")
