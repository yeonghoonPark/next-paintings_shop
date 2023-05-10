"use client";

import { useEffect, useState } from "react";
import Banner from "./Banner";
import ItemCard from "../components/base/ItemCard";

export default function Products() {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);

  const [categoryType, setCategoryType] = useState("all");
  const [sortType, setSortType] = useState("");

  const getProducts = async () => {
    const res = await fetch("/api/product/get");
    const json = await res.json();
    setAllProducts(json.data);
    setProducts(json.data);
  };

  const resetSortType = () => setSortType("");

  const onAllBtn = () => {
    setProducts([...allProducts]);
    setCategoryType("all");
    resetSortType("");
  };

  const onWatercolorBtn = () => {
    setProducts(
      [...allProducts].filter((cV) => cV.paintings_type === "watercolor"),
    );
    setCategoryType("watercolor");
    resetSortType("");
  };

  const onOilcolorBtn = () => {
    setProducts(
      [...allProducts].filter((cV) => cV.paintings_type === "oilcolor"),
    );
    setCategoryType("oilcolor");
    resetSortType("");
  };

  const onETCBtn = () => {
    setProducts([...allProducts].filter((cV) => cV.paintings_type === "etc"));
    setCategoryType("etc");
    resetSortType("");
  };

  const onNewBtn = (category) => {
    setSortType("new");
    if (categoryType === "all") {
      setProducts([...allProducts].filter((cV) => cV.is_new === true));
      return;
    }

    if (categoryType === category) {
      setProducts(
        [...allProducts].filter(
          (cV) => cV.is_new === true && cV.paintings_type === category,
        ),
      );
      return;
    }
  };

  const onHighPriceBtn = (category) => {
    setSortType("high");
    if (categoryType === "all") {
      setProducts([...allProducts].sort((a, b) => b.price - a.price));
      return;
    }

    if (categoryType === category) {
      setProducts(
        [...allProducts]
          .filter((cV) => cV.paintings_type === category)
          .sort((a, b) => b.price - a.price),
      );
      return;
    }
  };

  const onLowPriceBtn = (category) => {
    setSortType("low");
    if (categoryType === "all") {
      setProducts([...allProducts].sort((a, b) => a.price - b.price));
      return;
    }

    if (categoryType === category) {
      setProducts(
        [...allProducts]
          .filter((cV) => cV.paintings_type === category)
          .sort((a, b) => a.price - b.price),
      );
      return;
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Banner categoryType={categoryType} />
      <section className='products'>
        <div className='category-btn-group'>
          <button
            className={categoryType === "all" ? "btn checked" : "btn"}
            type='text'
            onClick={onAllBtn}
          >
            All
          </button>
          <button
            className={categoryType === "watercolor" ? "btn checked" : "btn"}
            type='text'
            onClick={onWatercolorBtn}
          >
            Watercolor
          </button>
          <button
            className={categoryType === "oilcolor" ? "btn checked" : "btn"}
            type='text'
            onClick={onOilcolorBtn}
          >
            Oilcolor
          </button>
          <button
            className={categoryType === "etc" ? "btn checked" : "btn"}
            type='text'
            onClick={onETCBtn}
          >
            ETC
          </button>
        </div>

        <div className='sort-btn-group'>
          <button
            className={sortType === "new" ? "btn checked" : "btn"}
            type='text'
            onClick={() => onNewBtn(categoryType)}
          >
            New
          </button>
          <button
            className={sortType === "high" ? "btn checked" : "btn"}
            type='text'
            onClick={() => onHighPriceBtn(categoryType)}
          >
            High Price
          </button>
          <button
            className={sortType === "low" ? "btn checked" : "btn"}
            type='text'
            onClick={() => onLowPriceBtn(categoryType)}
          >
            Low Price
          </button>
        </div>

        <div className='item-box'>
          {products.map((cV) => (
            <ItemCard key={cV._id} item={cV} />
          ))}
        </div>
      </section>
    </>
  );
}
