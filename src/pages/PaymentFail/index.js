import React, {useEffect} from "react";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import axios from "axios";

export function PaymentFail() {
  const location = useLocation();
  const queryLocation = location.search

  useEffect(() => {
    const cancelTrans = async () => {
      const product = await axios.get(`https://hcmut-e-commerce.herokuapp.com/api/payment/cancel${queryLocation}`)
      console.log(product)
    }
    cancelTrans()
  }, [queryLocation])
  return (
    <div className="w-full text-center my-10">
      <CloseCircleOutlined className="text-8xl text-red-500" />
      <h1 className="font-bold text-xl my-4">PAYMENT FAILED!</h1>
      <p className="text-lg">Something went wrong with your order.</p>
      <p className="text-lg">For more details, check Order status</p>
    </div>
  );
}