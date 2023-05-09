"use client";

import { useEffect, useState } from "react";
import { addComma } from "@/app/functions/common";

export default function MileageChargingPage({ signedUser }) {
  const [userInfo, setUserInfo] = useState([]);
  const [chargeVal, setChargeVal] = useState(0);

  const getUserInfo = () => {
    fetch(`/api/user_info/get?_id=${signedUser._id}`)
      .then((res) => res.json())
      .then((res) => setUserInfo(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const onHandleBtn = () => {
    fetch("/api/user_info/mileage_charging/update", {
      method: "POST",
      body: JSON.stringify({
        email: userInfo.email,
        mailage: chargeVal,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res.data);
        setChargeVal(0);
        getUserInfo();
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <h1>유저이름: {userInfo?.name}</h1>
      <h1>유저이메이일: {userInfo?.email}</h1>
      <h1>유저마일리지: {addComma(userInfo?.mailage) ?? "0"}</h1>
      <input
        type='number'
        value={chargeVal}
        onChange={(e) => setChargeVal(e.target.value)}
      />
      <button className='btn btn-md' onClick={onHandleBtn}>
        충전
      </button>
    </>
  );
}
