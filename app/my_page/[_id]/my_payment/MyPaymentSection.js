"use client";

import { addComma } from "@/app/functions/common";
import { useEffect, useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import LoadingPage from "@/app/loading";

export default function MyPaymentSection() {
  const [paymentList, setPaymentList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getPaymentList = async () => {
    const res = await fetch(`/api/user_info/payment/get`);
    const json = await res.json();
    setPaymentList(json.data);
    setIsLoading(true);
  };

  useEffect(() => {
    getPaymentList();
  }, []);

  const createHTML = () => {
    return paymentList.map((cV) => {
      return (
        <tr key={cV._id}>
          <td width={"20%"}>OR{cV.order_num}</td>
          <td width={"20%"}>{cV.time_stamp}</td>

          {cV.order_name_list.length > 1 ? (
            <td width={"20%"}>
              <span>{cV.order_name_list[0]}</span>
              {` and ${cV.order_name_list.length - 1} thing..`}
            </td>
          ) : (
            <td width={"20%"}>
              <span>{cV.order_name_list[0]}</span>
            </td>
          )}
          <td width={"20%"}>{cV.payment_type}</td>
          <td width={"20%"}>{addComma(cV.payment_amount)} ₩</td>
        </tr>
      );
    });
  };

  return (
    <section className='my-payment-section'>
      <div className='title-part'>
        <h3>You can check your payment information.</h3>
      </div>

      {!isLoading ? (
        LoadingPage()
      ) : (
        <>
          {paymentList.length < 1 ? (
            <div className='nonexistent'>
              <FaExclamationCircle className='fa-exclamation-circle' />
              <span>Payment information does not exist.</span>
            </div>
          ) : (
            <div className='table-box'>
              <table className='payment-table'>
                <thead>
                  <tr>
                    <th>Order No.</th>
                    <th>Order Date</th>
                    <th>Products</th>
                    <th>Payment Mehtod</th>
                    <th>Payment Amount</th>
                  </tr>
                </thead>
                <tbody>{createHTML()}</tbody>
              </table>
            </div>
          )}
        </>
      )}
    </section>
  );
}
