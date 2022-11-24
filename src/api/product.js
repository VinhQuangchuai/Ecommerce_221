import React, {useState, useEffect} from "react";
import axios from 'axios'

export const getProductById = (id) => axios.get(`http:localhost:3001/api/product/detail/${id}`)

export const fetchPosts = () => axios.get("http:localhost:3001/api/product/getall")
