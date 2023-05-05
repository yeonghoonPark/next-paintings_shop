"use client";

import { useEffect, useState } from "react";
import ItemCard from "../../base/ItemCard";

export default function NewArrivalCard() {
  const [newPaintings, setNewPaintings] = useState([]);

  const getNewPaintings = async () => {
    const res = await fetch("/api/product/new_arrival/get");
    const json = await res.json();
    setNewPaintings(json.data);
  };

  useEffect(() => {
    getNewPaintings();
  }, []);

  return (
    <>
      {newPaintings.map((cV) => {
        return (
          <ItemCard key={cV._id} item={cV} />
          // <div className='product-card' key={cV._id}>
          //   <Link href={"/"}>
          //     <img
          //       className='product_img'
          //       src={`${cV.image}`}
          //       alt={`${cV.product_name}`}
          //     />

          //     <h4>{cV.product_name}</h4>
          //     <h5>{cV.producer}</h5>
          //     <p>{cV.paintings_type}</p>
          //     <p>{cV.size} (cm)</p>
          //     {cV.is_new && (
          //       <img className='new_mark' src={"/images/mark/new_mark.png"} />
          //     )}
          //     <hr />
          //     {cV.stock === "0" ? (
          //       <p className='sold-out'>SOLD OUT</p>
          //     ) : (
          //       <p className='price'>{addComma(cV.price)} ₩</p>
          //     )}
          //   </Link>
          // </div>
        );
      })}
    </>
  );
}
