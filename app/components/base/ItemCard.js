import { addComma } from "@/app/functions/common";
import Link from "next/link";
import Image from "next/legacy/image";

export default function ItemCard({ item }) {
  return (
    <div className='item-card' key={item._id}>
      <Link prefetch={false} href={`/shop_detail/${item._id}`}>
        <div className='img-box'>
          <Image
            className='item-img'
            src={`${item.image}`}
            alt={`${item.product_name}`}
            width={288}
            height={191}
            layout='responsive'
          />
        </div>

        <h4>{item.product_name}</h4>
        <h5>{item.producer}</h5>
        <p className={`paintings-type ${item.paintings_type}`}>
          {item.paintings_type}
        </p>
        <p>{item.size} (cm)</p>
        {item.is_new && (
          <img
            className='new_mark'
            src={"/images/mark/new_mark.png"}
            alt='new product'
          />
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
