"use client";

import { addComma } from "@/app/functions/common";
import LoadingPage from "@/app/loading";
import { useEffect, useState } from "react";

export default function MyMileageSection({ session, signedUser }) {
  const [isLoading, setIsLoading] = useState(false);
  const [mileage, setMileage] = useState(0);
  const [mileageChargeAmount, setMileageChargeAmount] = useState(0);
  const [totalMileage, setTotalMileage] = useState(0);

  const getUser = async () => {
    const res = await fetch(`/api/user_info/get?_id=${signedUser._id}`);
    const json = await res.json();
    setMileage(json.data.mileage ?? 0);
    setTotalMileage(json.data.mileage ?? 0);
    setIsLoading(true);
  };

  useEffect(() => {
    getUser();
  }, []);

  const onHandleCargeBtn = () => {
    if (mileageChargeAmount === 0) {
      alert("Please select the amount you want to charge");
      return;
    }

    fetch("/api/user_info/mileage/update", {
      method: "POST",
      body: JSON.stringify({
        email: session?.user?.email,
        mileage: totalMileage,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res.data);
        setMileageChargeAmount(0);
        getUser();
      })
      .catch((err) => console.error(err));
  };

  return (
    <section className='my-mileage-section'>
      <div className='title-part'>
        <h3>You can charge and pay your mileage for free.</h3>
      </div>
      {!isLoading ? (
        LoadingPage()
      ) : (
        <>
          <form>
            <div>
              <label htmlFor='my-mileage'>My Mileage</label>
              <input
                id='my-mileage'
                type='text'
                disabled
                readOnly
                value={addComma(mileage)}
              />
            </div>
            <div>
              <label htmlFor='mileage-charge-amount'>Charging amount</label>
              <input
                id='mileage-charge-amount'
                type='text'
                readOnly
                disabled
                value={addComma(mileageChargeAmount)}
              />
              <button
                type='text'
                className='btn'
                onClick={(e) => {
                  e.preventDefault();
                  setMileageChargeAmount(mileageChargeAmount + 10000);
                  setTotalMileage(
                    parseInt(mileage) + mileageChargeAmount + 10000,
                  );
                }}
              >
                10,000 ₩
              </button>
              <button
                type='text'
                className='btn'
                onClick={(e) => {
                  e.preventDefault();
                  setMileageChargeAmount(mileageChargeAmount + 100000);
                  setTotalMileage(
                    parseInt(mileage) + mileageChargeAmount + 100000,
                  );
                }}
              >
                100,000 ₩
              </button>
            </div>
            <div>
              <label htmlFor='total-mileage'>My Mileage after charging</label>
              <input
                id='total-mileage'
                type='text'
                disabled
                readOnly
                value={addComma(totalMileage)}
              />
            </div>
          </form>
          <div className='btn-group'>
            <button
              type='text'
              className='btn btn-md'
              onClick={onHandleCargeBtn}
            >
              Free Charging
            </button>
          </div>
        </>
      )}
    </section>
  );
}
