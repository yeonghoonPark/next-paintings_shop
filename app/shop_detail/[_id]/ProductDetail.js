"use client";

import { addComma } from "@/app/functions/common";
import { useEffect } from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export default function ProductDetail({ data }) {
  const setCursorEvent = (el, propertyVal) => (el.style.cursor = propertyVal);

  useEffect(() => {
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
            <button className='btn btn-lg' type='text'>
              Add to Cart <FaShoppingCart className='fa-shopping-cart' />
            </button>
            <button className='btn btn-lg' type='text'>
              Favorite <FaHeart className='fa-heart' />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
