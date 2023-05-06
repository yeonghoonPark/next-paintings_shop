"use client";

import { addComma } from "@/app/functions/common";
// import { useState, useRef } from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

export default function ProductDetail({ data }) {
  return (
    <section className='product-detail'>
      <div className='item-detail-box'>
        <div className='item-detail-left'>
          <img src={data.image} alt={data.product_name} />
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
