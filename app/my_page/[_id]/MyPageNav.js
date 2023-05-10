"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  FaUser,
  FaCoins,
  FaHeart,
  FaShoppingCart,
  FaCreditCard,
} from "react-icons/fa";

export default function MyPageNav({ _id }) {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  return (
    <>
      <Link
        // prefetch={false}
        className={search === "my_profile" ? "btn checked" : "btn"}
        href={`/my_page/${_id}?search=my_profile`}
      >
        My Profile
        <FaUser
          className={search === "my_profile" ? "fa-user checked" : "fa-user"}
        />
      </Link>
      <Link
        // prefetch={false}
        className={search === "my_mileage" ? "btn checked" : "btn"}
        href={`/my_page/${_id}/my_mileage?search=my_mileage`}
      >
        My Mileage
        <FaCoins
          className={search === "my_mileage" ? "fa-coins checked" : "fa-coins"}
        />
      </Link>
      <Link
        // prefetch={false}
        className={search === "my_favorite" ? "btn checked" : "btn"}
        href={`/my_page/${_id}/my_favorite?search=my_favorite`}
      >
        My Favorite
        <FaHeart
          className={search === "my_favorite" ? "fa-heart checked" : "fa-heart"}
        />
      </Link>
      <Link
        // prefetch={false}
        className={search === "my_cart" ? "btn checked" : "btn"}
        href={`/my_page/${_id}/my_cart?search=my_cart`}
      >
        My Cart
        <FaShoppingCart
          className={
            search === "my_cart"
              ? "fa-shopping-cart checked"
              : "fa-shopping-cart"
          }
        />
      </Link>
      <Link
        // prefetch={false}
        className={search === "my_payment" ? "btn checked" : "btn"}
        href={`/my_page/${_id}/my_payment?search=my_payment`}
      >
        My Payment
        <FaCreditCard
          className={
            search === "my_payment"
              ? "fa-credit-card checked"
              : "fa-credit-card"
          }
        />
      </Link>
    </>
  );
}
