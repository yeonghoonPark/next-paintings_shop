import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Link from "next/link";
import SignInOutBtn from "./SignInOutBtn";
import { FaCoins, FaHeart, FaShoppingCart } from "react-icons/fa";
import { connectDB } from "@/util/database";

export default async function Header() {
  const session = await getServerSession(authOptions);
  const db = (await connectDB).db("paintings_shop");
  const signedUser = await db
    .collection("users")
    .findOne({ email: session?.user.email });
  session && (signedUser._id = await signedUser._id.toString());

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
                <Link
                  href={`/my_page/${signedUser._id}/my_mileage?search=my_mileage`}
                >
                  <FaCoins className='fa-coins' />
                </Link>
              </span>
              <span title='My Favorites'>
                <Link
                  href={`/my_page/${signedUser._id}/my_favorite?search=my_favorite`}
                >
                  <FaHeart className='fa-heart' />
                </Link>
              </span>
              <span title='My Cart'>
                <Link
                  href={`/my_page/${signedUser._id}/my_cart?search=my_cart`}
                >
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
