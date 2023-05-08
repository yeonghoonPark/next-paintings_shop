"use client";

import Link from "next/link";
import SignInOutBtn from "./SignInOutBtn";
import { FaCoins, FaHeart, FaShoppingCart } from "react-icons/fa";

export default function CSRHeader({ session, signedUser }) {
  if (window?.location?.pathname === "/test") {
    return null;
  } else {
    return (
      <header>
        <nav className='nav'>
          <div className='left-menu'>
            <div className='logo'>
              <img src='/images/logo.png' />
            </div>
            <Link href='/'>Home</Link>
            <Link href='/shop'>Shop</Link>
          </div>
          <div className='right-menu'>
            {!session ? (
              <Link href='/sign_up'>Sign Up</Link>
            ) : (
              <>
                <span title='My Mileage'>
                  <Link href={`/user_info/${signedUser._id}`}>
                    <FaCoins className='fa-coins' />
                  </Link>
                </span>
                <span title='My Favorites'>
                  <Link href='/'>
                    <FaHeart className='fa-heart' />
                  </Link>
                </span>
                <span title='My Cart'>
                  <Link href='/'>
                    <FaShoppingCart className='fa-shopping-cart' />
                  </Link>
                </span>
              </>
            )}
            <SignInOutBtn session={session} signedUser={signedUser} />
          </div>
        </nav>
      </header>
    );
  }
}
