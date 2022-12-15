import React, {useEffect} from "react";
import { CheckCircleOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import axios from "axios";

export function PaymentSuccess() {
  const location = useLocation();
  const queryLocation = location.search 

  useEffect(() => {
    const executeTrans = async () => {
      const product = await axios.get(`https://hcmut-e-commerce.herokuapp.com/api/payment/success${queryLocation}`)
      console.log(product)
      const detail = await axios.get(`https://hcmut-e-commerce.herokuapp.com/api/payment/getorder${queryLocation}`)
      console.log(detail)
    }
    executeTrans()
  }, [queryLocation])
  return (
    <div className="w-full text-center my-10">
      <CheckCircleOutlined className="text-8xl text-blue-500" />
      <h1 className="font-bold text-xl my-4">PAYMENT SUCCESS!</h1>
      <p className="text-lg">Your order was placed successfully.</p>
      <p className="text-lg">For more details, check Order status</p>
    </div>
  );
}