"use client";

import { useCallback, useEffect, useState } from "react";
import Banner from "./Banner";
import ItemCard from "../components/base/ItemCard";
import LoadingPage from "../loading";

const CLASS_NAME_ALL = "all";
const CLASS_NAME_WATERCOLOR = "watercolor";
const CLASS_NAME_OILCOLOR = "oilcolor";
const CLASS_NAME_ETC = "etc";
const CLASS_NAME_NEW = "new";
const CLASS_NAME_HIGH = "high";
const CLASS_NAME_LOW = "low";

const categoryBtnGroup = [
  { categoryType: CLASS_NAME_ALL, text: "All" },
  { categoryType: CLASS_NAME_WATERCOLOR, text: "WaterColor" },
  { categoryType: CLASS_NAME_OILCOLOR, text: "OilColor" },
  { categoryType: CLASS_NAME_ETC, text: "ETC" },
];

export default function Products() {
  const [isLoading, setIsLoading] = useState(false);

  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);

  const [categoryType, setCategoryType] = useState(CLASS_NAME_ALL);
  const [sortType, setSortType] = useState("");

  const getProducts = async () => {
    const res = await fetch("/api/product/get");
    const json = await res.json();
    setAllProducts(json.data);
    setProducts(json.data);
    setIsLoading(true);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const resetSortType = () => setSortType("");

  const hadleTypeBtn = useCallback(
    (categoryType) => {
      resetSortType();
      setCategoryType(categoryType);
      categoryType === CLASS_NAME_ALL
        ? setProducts([...allProducts])
        : setProducts(
            [...allProducts].filter((cV) => cV.paintings_type === categoryType),
          );
    },
    [allProducts],
  );

  const handleNewBtn = useCallback(
    (categoryType) => {
      setSortType(CLASS_NAME_NEW);
      categoryType === CLASS_NAME_ALL
        ? setProducts([...allProducts].filter((cV) => cV.is_new === true))
        : setProducts(
            [...allProducts].filter(
              (cV) => cV.is_new === true && cV.paintings_type === categoryType,
            ),
          );
    },
    [allProducts],
  );

  const handleHighBtn = useCallback(
    (categoryType) => {
      setSortType(CLASS_NAME_HIGH);
      categoryType === CLASS_NAME_ALL
        ? setProducts([...allProducts].sort((a, b) => b.price - a.price))
        : setProducts(
            [...allProducts]
              .filter((cV) => cV.paintings_type === categoryType)
              .sort((a, b) => b.price - a.price),
          );
    },
    [allProducts],
  );

  const handleLowBtn = useCallback(
    (categoryType) => {
      setSortType(CLASS_NAME_LOW);
      categoryType === CLASS_NAME_ALL
        ? setProducts([...allProducts].sort((a, b) => a.price - b.price))
        : setProducts(
            [...allProducts]
              .filter((cV) => cV.paintings_type === categoryType)
              .sort((a, b) => a.price - b.price),
          );
    },
    [allProducts],
  );

  return (
    <>
      <Banner categoryType={categoryType} />
      <section className='products'>
        <div className='category-btn-group'>
          {categoryBtnGroup.map((cV, i) => (
            <button
              className={`btn ${categoryType === cV.categoryType && "checked"}`}
              key={i}
              type='button'
              onClick={() => hadleTypeBtn(cV.categoryType)}
            >
              {cV.text}
            </button>
          ))}
        </div>

        <div className='sort-btn-group'>
          <button
            className={`btn ${sortType === CLASS_NAME_NEW && "checked"}`}
            type='text'
            onClick={() => handleNewBtn(categoryType)}
          >
            New
          </button>
          <button
            className={`btn ${sortType === CLASS_NAME_HIGH && "checked"}`}
            type='text'
            onClick={() => handleHighBtn(categoryType)}
          >
            High Price
          </button>
          <button
            className={`btn ${sortType === CLASS_NAME_LOW && "checked"}`}
            type='text'
            onClick={() => handleLowBtn(categoryType)}
          >
            Low Price
          </button>
        </div>

        <div className='item-box'>
          {!isLoading ? (
            LoadingPage()
          ) : (
            <>
              {products.map((cV) => (
                <ItemCard key={cV._id} item={cV} />
              ))}
            </>
          )}
        </div>
      </section>
    </>
  );
}
