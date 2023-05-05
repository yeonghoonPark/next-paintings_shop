import { addComma } from "@/app/functions/common";
import Link from "next/link";

export default function ItemCard({ item }) {
  return (
    <div className='item-card' key={item._id}>
      <Link href={"/"}>
        <img
          className='item-img'
          src={`${item.image}`}
          alt={`${item.product_name}`}
        />

        <h4>{item.product_name}</h4>
        <h5>{item.producer}</h5>
        <p>{item.paintings_type}</p>
        <p>{item.size} (cm)</p>
        {item.is_new && (
          <img className='new_mark' src={"/images/mark/new_mark.png"} />
        )}
        <hr className='item-hr' />
        {item.stock === "0" ? (
          <p className='sold-out'>SOLD OUT</p>
        ) : (
          <p className='price'>{addComma(item.price)} ₩</p>
        )}
      </Link>
    </div>
  );
}
