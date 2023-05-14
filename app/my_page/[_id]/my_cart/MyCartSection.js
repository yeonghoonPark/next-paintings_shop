"use client";

import { addComma } from "@/app/functions/common";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import LoadingPage from "@/app/loading";

export default function MyCartSection({ session, signedUser }) {
  const [cartList, setCartList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [mileage, setMileage] = useState(0);

  const [totalPrice, setToltalPrice] = useState(0);

  const getUser = async () => {
    const res = await fetch(`/api/user_info/get?_id=${signedUser._id}`);
    const json = await res.json();
    setMileage(json.data.mileage ?? 0);
  };

  const getCartList = async () => {
    try {
      const res = await fetch(
        `/api/user_info/cart/get?email=${session?.user?.email}`,
      );
      const json = await res.json();
      setCartList(json.data);
      setIsLoading(true);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUser();
    getCartList();
  }, []);

  const renderHTMLString = () => {
    return cartList.map((cV) => {
      return (
        <li key={cV._id}>
          <label htmlFor={`${cV.product_name}`} onClick={onHandleCheckbox}>
            <input
              id={`${cV.product_name}`}
              type='checkbox'
              className='checkbox-item'
              value={`${cV._id}`}
              data-price={`${cV.price}`}
              data-stock={`${cV.stock}`}
            />
          </label>
          <div className='img-box'>
            <Link prefetch={false} href={`/shop_detail/${cV?._id}`}>
              <img src={`${cV?.image}`} alt={`${cV?.product_name}`} />
            </Link>
          </div>
          <div className='product-info'>
            <h4>{cV?.product_name}</h4>
            <p>
              <span className='producer'>{cV?.producer}</span>
              <span className={`paintings-type ${cV?.paintings_type}`}>
                {cV?.paintings_type}
              </span>
              {cV.is_new && (
                <img className='is-new' src='/images/mark/new_mark.png' />
              )}
              <span className='size'>{cV?.size} (cm)</span>
            </p>
            <p className='production-data'>{cV?.production_data}</p>
            {cV.stock !== "0" ? (
              <p className='price'>{addComma(cV?.price)} ₩</p>
            ) : (
              <p className='sold-out'>SOLD OUT</p>
            )}
          </div>
        </li>
      );
    });
  };

  const onHandleCheckbox = (e) => {
    const target = e.currentTarget.firstChild;
    const price = target.dataset.price;
    const stock = target.dataset.stock;

    if (stock === "0") return;

    target.checked
      ? setToltalPrice(totalPrice + parseInt(price))
      : setToltalPrice(totalPrice - parseInt(price));
  };

  const onHandleAllCheck = (e) => {
    const target = e.currentTarget.firstChild;
    const checkboxs = document.querySelectorAll(".checkbox-item");

    let priceList = [];

    checkboxs.forEach((cV) => {
      cV.checked = target.checked ? true : false;
      cV.dataset.stock !== "0" && priceList.push(parseInt(cV.dataset.price));
    });

    target.checked
      ? setToltalPrice(priceList.reduce((acc, cV) => acc + cV, 0))
      : setToltalPrice(0);
  };

  const deleteCartItem = (checkedIdList, checkAllItem) => {
    fetch(`/api/user_info/cart/delete`, {
      method: "DELETE",
      body: JSON.stringify({
        email: session?.user?.email,
        checked_id_list: checkedIdList,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res.data);
        setToltalPrice(0);
        getCartList();
        checkAllItem.checked = false;
      })
      .catch((err) => console.error(err));
  };

  const onHandleDeleteBtn = () => {
    const checkboxs = document.querySelectorAll(".checkbox-item");
    const checkAllItem = document.getElementById("check-all-item");
    const checkedIdList = [];

    checkboxs.forEach((cV) => cV.checked && checkedIdList.push(cV.value));

    if (checkedIdList.length < 1) {
      alert("Please select a product");
      return;
    }

    const deleteConfirm = confirm(
      `Are you sure you want to delete the ${checkedIdList.length} selected products?`,
    );

    if (deleteConfirm) {
      deleteCartItem(checkedIdList, checkAllItem);
    }
  };

  const orderCartItem = (
    checkedIdList,
    checkedNameList,
    checkAllItem,
    checkboxs,
  ) => {
    fetch("/api/user_info/payment/insert", {
      method: "POST",
      body: JSON.stringify({
        email: session?.user?.email,
        checked_id_list: checkedIdList,
        checked_name_list: checkedNameList,
        mileage: mileage,
        total_price: totalPrice,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res.data);

        fetch(`/api/user_info/cart/delete`, {
          method: "DELETE",
          body: JSON.stringify({
            email: session?.user?.email,
            checked_id_list: checkedIdList,
          }),
        })
          .then(() => {
            setToltalPrice(0);
            checkAllItem.checked = false;
            checkboxs.forEach((cV) => (cV.checked = false));
            getCartList();
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  };

  const onHandleOrderBtn = () => {
    const checkboxs = document.querySelectorAll(".checkbox-item");
    const checkAllItem = document.getElementById("check-all-item");
    const checkedIdList = [];
    const checkedNameList = [];

    checkboxs.forEach((cV) => {
      if (cV.dataset.stock !== "0" && cV.checked) {
        checkedIdList.push(cV.value);
        checkedNameList.push(cV.id);
      }
    });

    if (checkedIdList.length < 1) {
      alert("Please select the product you want to pay for");
      return;
    }

    if (parseInt(mileage) < parseInt(totalPrice)) {
      alert(
        "You don't have enough mileage, Please pay after charging the mileage.",
      );
      return;
    }

    orderCartItem(checkedIdList, checkedNameList, checkAllItem, checkboxs);
  };

  return (
    <section className='my-cart-section'>
      <div className='title-part'>
        <h3>My Shopping Cart List.</h3>
        <p>※ You cannot order products that are sold out.</p>
      </div>

      {!isLoading ? (
        LoadingPage()
      ) : (
        <>
          {cartList.length < 1 ? (
            <div className='nonexistent'>
              <FaExclamationCircle className='fa-exclamation-circle' />
              <span>You don't have a product in your shopping cart.</span>
              <span>
                You can add and pay for the product you want to purchase.
              </span>

              <button className='btn btn-md'>
                <Link prefetch={false} href={"/shop"}>
                  Go to Shop
                </Link>
              </button>
            </div>
          ) : (
            <>
              <div className='checkbox-group'>
                <label htmlFor='check-all-item' onClick={onHandleAllCheck}>
                  <input id='check-all-item' type='checkbox' />
                </label>
                <button type='text' className='btn' onClick={onHandleDeleteBtn}>
                  Delete Selected Product
                </button>
              </div>
              <ul>{renderHTMLString()}</ul>
              <div className='payment-box'>
                <div className='total-price-box'>
                  <span>Total Price</span>
                  <em>{addComma(totalPrice)} ₩</em>
                </div>

                <button
                  type='text'
                  className='btn btn-md'
                  onClick={onHandleOrderBtn}
                >
                  Order Now
                </button>
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
}
