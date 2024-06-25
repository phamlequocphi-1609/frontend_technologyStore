import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

function Paysuccess() {
  const params = useParams();
  const orderCode = params.code;
  const orderDate = params.date;
  const location = useLocation();
  const total = location.state ? location.state.total : "";
  return (
    <div className="col-span-12">
      <div className="success">
        <div className="grid grid-cols-12">
          <div className="col-span-5">
            <img
              className="w-[300px] lg:ml-10 md:ml-0"
              src={require("../Layouts/img/product/15.jpg")}
            />
            <p className="text-[#f63d30] font-bold text-[16px] text-center">
              Please check your email for order information
            </p>
          </div>
          <div className="col-span-7">
            <div className="paysuccess p-8 bg-[#fafafa]">
              <h3 className="text-[#7a9c59] text-[18px] font-bold mb-3">
                Thank you. Your order has been placed successfully.
              </h3>
              <ul>
                <li className="mb-[10px]">
                  Order Code: <strong>{orderCode}</strong>
                </li>
                <li className="mb-[10px]">
                  Date: <strong>{orderDate}</strong>
                </li>
                <li className="mb-[10px]">
                  Total: <strong>{total.toLocaleString("vi-VN")} đ</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Paysuccess;
