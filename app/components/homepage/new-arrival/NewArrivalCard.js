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
        return <ItemCard key={cV._id} item={cV} />;
      })}
    </>
  );
}
