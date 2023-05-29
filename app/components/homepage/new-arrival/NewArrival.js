"use client";

import useSWR from "swr";
import LoadingPage from "@/app/loading";
import ItemCard from "../../base/ItemCard";

export default function NewArrival() {
  const { data, isLoading, error } = useSWR("/api/product/new_arrival/get");
  const newPaintings = data?.data;

  return (
    <section className='new-arrival'>
      <h2>New Arrival</h2>
      <div className='item-box'>
        {isLoading ? (
          <LoadingPage />
        ) : (
          <>
            {newPaintings.map((cV) => {
              return <ItemCard key={cV._id} item={cV} />;
            })}
          </>
        )}
      </div>
    </section>
  );
}
