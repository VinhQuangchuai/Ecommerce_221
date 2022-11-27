import React from "react";
import { CheckCircleOutlined } from "@ant-design/icons";

export function PaymentSuccess() {
  return (
    <div className="w-full text-center my-10">
      <CheckCircleOutlined className="text-8xl text-blue-500" />
      <h1 className="font-bold text-xl my-4">PAYMENT SUCCESS!</h1>
      <p className="text-lg">Your order was placed successfully.</p>
      <p className="text-lg">For more details, check Order status</p>
      <button
        onClick={() => {}}
        className=" bg-blue-500 text-white font-bold text-lg p-2 rounded-xl hover:bg-blue-400 mt-10 w-[300px] h-[50px] mx-auto"
      >
        ORDER STATUS
      </button>
    </div>
  );
}
