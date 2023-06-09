"use client";

import { addComma } from "@/app/functions/common";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import LoadingPage from "@/app/loading";

export default function MyFavoriteSection({ session }) {
  const [favoriteList, setFavoriteList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getFavoriteList = async () => {
    try {
      const res = await fetch(
        `/api/user_info/favorite/get?email=${session?.user?.email}`,
      );
      const json = await res.json();
      setFavoriteList(json.data);
      setIsLoading(true);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getFavoriteList();
  }, []);

  const renderHTMLString = () => {
    return favoriteList.map((cV) => {
      return (
        <li key={cV._id}>
          <label htmlFor={`${cV.product_name}`}>
            <input
              id={`${cV.product_name}`}
              type='checkbox'
              className='checkbox-item'
              value={`${cV._id}`}
            />
          </label>
          <div className='img-box'>
            <Link prefetch={false} href={`/shop_detail/${cV?._id}`}>
              <img src={`${cV?.image}`} alt={`${cV?.product_name}`} />
            </Link>
          </div>
          <div className='product-info'>
            <h2>{cV?.product_name}</h2>
            <p>
              <span className='producer'>{cV?.producer}</span>
              <span className={`paintings-type ${cV?.paintings_type}`}>
                {cV?.paintings_type}
              </span>
              {cV.is_new && (
                <img
                  className='is-new'
                  src='/images/mark/new_mark.png'
                  alt='new product'
                />
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

  const onHandleAllCheck = (e) => {
    const target = e.currentTarget.firstChild;
    const checkboxs = document.querySelectorAll(".checkbox-item");
    checkboxs.forEach((cV) => (cV.checked = target.checked ? true : false));
  };

  const deleteFavorite = (checkedIdList, checkAllItem) => {
    fetch(`/api/user_info/favorite/delete`, {
      method: "DELETE",
      body: JSON.stringify({
        email: session?.user?.email,
        checked_id_list: checkedIdList,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res.data);
        getFavoriteList();
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
      deleteFavorite(checkedIdList, checkAllItem);
    }
  };

  return (
    <section className='my-fovorite-section'>
      <div className='title-part'>
        <h3>My favorite product list.</h3>
      </div>

      {!isLoading ? (
        LoadingPage()
      ) : (
        <>
          {favoriteList.length < 1 ? (
            <div className='nonexistent'>
              <FaExclamationCircle className='fa-exclamation-circle' />
              <span>You don't have a favorite product.</span>
              <span>
                If you register your favorite product, you can easily manage it
                on My Page.
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
            </>
          )}
        </>
      )}
    </section>
  );
}
