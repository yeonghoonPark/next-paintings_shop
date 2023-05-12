"use client";

import { addComma } from "@/app/functions/common";
import { useEffect, useState } from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import { useRouter } from "next/navigation";

export default function ProductDetail({ data, _id, session, signedUser }) {
  const router = useRouter();
  const setCursorEvent = (el, propertyVal) => (el.style.cursor = propertyVal);

  const [isInCart, setIsInCart] = useState(null);

  const [favoriteList, setFavoriteList] = useState([]);
  const [isFavorite, setIsFavorite] = useState(null);

  const getCartItem = async () => {
    const res = await fetch(`/api/cart/get?email=${session?.user.email}`);
    const json = await res.json();
    const checkIsInCart = await json.data.some((cV) => cV.product_id === _id);
    setIsInCart(checkIsInCart);
  };

  const getFavorite = async () => {
    const res = await fetch(`/api/favorite/get?product_id=${_id}`);
    const json = await res.json();
    const checkIsFavorite = await json.data.some(
      (cV) => cV.email === session?.user?.email,
    );
    setIsFavorite(checkIsFavorite);
    setFavoriteList(json.data);
  };

  useEffect(() => {
    getCartItem();
    getFavorite();

    const transformWrapper = document.querySelector(".react-transform-wrapper");
    transformWrapper.addEventListener("mouseover", () => {
      setCursorEvent(transformWrapper, "grab");
    });
    transformWrapper.addEventListener("mousedown", () => {
      setCursorEvent(transformWrapper, "grabbing");
    });
    transformWrapper.addEventListener("mouseup", () => {
      setCursorEvent(transformWrapper, "grab");
    });

    return () => {
      transformWrapper.removeEventListener("mouseover", () => {
        setCursorEvent(transformWrapper, "grab");
      });
      transformWrapper.removeEventListener("mousedown", () => {
        setCursorEvent(transformWrapper, "grabbing");
      });
      transformWrapper.removeEventListener("mouseup", () => {
        setCursorEvent(transformWrapper, "grab");
      });
    };
  }, []);

  const deleteCartItem = () => {
    fetch(`/api/cart/delete`, {
      method: "DELETE",
      body: JSON.stringify({ product_id: _id }),
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res.data);
        getCartItem();
      })
      .catch((err) => console.error(err));
  };

  const insertCartItem = () => {
    fetch("/api/cart/insert", {
      method: "POST",
      body: JSON.stringify({
        product_id: _id,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        const insertCartItemConfrim = confirm(res.data);
        if (insertCartItemConfrim) {
          router.push(`/my_page/${signedUser._id}/my_cart?search=my_cart`);
        }
        getCartItem();
      })
      .catch((err) => console.error(err));
  };

  const onHandleCartBtn = (_id) => {
    if (!session) {
      alert("로그인 후 이용할 수 있습니다.");
      return;
    }

    if (isInCart) {
      const deleteCartItemConfirm = confirm(
        `이미 장바구니에 해당상품이 존재합니다,\n장바구니에서 해당상품을 삭제하시겠습니까?`,
      );
      if (deleteCartItemConfirm) {
        deleteCartItem();
      }
    } else {
      insertCartItem();
    }
  };

  const insertFavorite = () => {
    fetch(`/api/favorite/insert`, {
      method: "POST",
      body: JSON.stringify({
        product_id: _id,
      }),
    })
      .then(() => getFavorite())
      .catch((err) => console.error(err));
  };

  const deleteFavorite = () => {
    fetch(`/api/favorite/delete`, {
      method: "DELETE",
      body: JSON.stringify({ product_id: _id }),
    })
      .then(() => getFavorite())
      .catch((err) => console.error(err));
  };

  const onHandleFavoriteBtn = () => {
    if (!session) {
      alert("로그인 후 이용할 수 있습니다.");
      return;
    }

    if (isFavorite) {
      deleteFavorite();
    } else {
      insertFavorite();
    }
  };

  return (
    <section className='product-detail'>
      <div className='item-detail-box'>
        <div className='item-detail-left'>
          <TransformWrapper initialScale={1} minScale={1} maxScale={8}>
            <TransformComponent>
              <img src={data.image} alt={data.product_name} />
            </TransformComponent>
          </TransformWrapper>
        </div>

        <div className='item-detail-right'>
          <h4>{data.product_name}</h4>
          <hr />
          <table>
            <caption>Product Info</caption>
            <tbody>
              <tr>
                <th>Producer</th>
                <td className='producer'>{data.producer}</td>
              </tr>
              <tr>
                <th>Painting's Type</th>
                <td className={`paintings-type ${data.paintings_type}`}>
                  {data.paintings_type}
                  {data.is_new && (
                    <img
                      src='/images/mark/new_mark.png'
                      alt='new_mark'
                      title='New'
                      style={{ width: "20px", marginLeft: "1rem" }}
                    />
                  )}
                </td>
              </tr>
              <tr>
                <th>Size</th>
                <td className='size'>{data.size} (cm)</td>
              </tr>
              <tr>
                <th>Production Date</th>
                <td className='production-data'>{data.production_data}</td>
              </tr>
              <tr>
                {data.stock === "0" ? <th>Stock</th> : <th>Price</th>}
                {data.stock === "0" ? (
                  <td>
                    <span className='sold-out'>SOLD OUT</span>
                  </td>
                ) : (
                  <td>
                    <span className='price'>{addComma(data.price)} ₩</span>
                  </td>
                )}
              </tr>
            </tbody>
          </table>

          <hr />

          <div className='btn-group'>
            <button
              className='btn btn-lg'
              type='text'
              onClick={() => onHandleCartBtn(_id)}
            >
              Add to Cart{" "}
              <FaShoppingCart
                className={
                  isInCart ? "fa-shopping-cart checked" : "fa-shopping-cart"
                }
              />
            </button>
            <button
              className='btn btn-lg'
              type='text'
              onClick={() => onHandleFavoriteBtn()}
            >
              Favorite{" "}
              <FaHeart
                className={isFavorite ? "fa-heart checked" : "fa-heart"}
              />
              {""}
              &#40; {favoriteList.length} &#41;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
