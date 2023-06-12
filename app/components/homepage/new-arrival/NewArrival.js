"use client";

import useSWR from "swr";
import ItemCard from "../../base/ItemCard";
import MoonLoader from "react-spinners/MoonLoader";

export default function NewArrival() {
  const { data, isLoading } = useSWR("/api/product/new_arrival/get");
  const newPaintings = data?.data;

  return (
    <section className='new-arrival'>
      <h2 className='new-arrival-title'>New Arrival</h2>
      <div className='item-box'>
        {isLoading && (
          <div className='new-loading'>
            <MoonLoader color='#f35129' />
          </div>
        )}
        {newPaintings && (
          <>
            {newPaintings.map((cV) => (
              <ItemCard key={cV._id} item={cV} />
            ))}
          </>
        )}
      </div>
    </section>
  );
}
