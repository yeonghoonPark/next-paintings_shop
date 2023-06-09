"use client";

import useSWR from "swr";
import ItemCard from "../../base/ItemCard";

export default function NewArrival() {
  const { data } = useSWR("/api/product/new_arrival/get");
  const newPaintings = data?.data;

  return (
    <section className='new-arrival'>
      <h2 className='new-arrival-title'>New Arrival</h2>
      <div className='item-box'>
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
