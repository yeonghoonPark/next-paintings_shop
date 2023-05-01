import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Link from "next/link";
import SignInOutBtn from "./components/header/SignInOutBtn";
import { FaCoins, FaHeart, FaShoppingCart } from "react-icons/fa";

export default async function Header() {
  const session = await getServerSession(authOptions);
  console.log("Header컴포넌트 session = ", session);

  return (
    <header>
      <nav className='nav'>
        <div className='left-menu'>
          <div className='logo'>
            <img src='/images/logo.png' />
          </div>
          <Link href='/'>Home</Link>
          <Link href='/'>Shop</Link>
        </div>
        <div className='right-menu'>
          {!session ? (
            <Link href='/'>SignUp</Link>
          ) : (
            <>
              <span title='My Mileage'>
                <FaCoins className='fa-coins' /> {session.user.mailage} ₩
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
          <SignInOutBtn session={session} />
        </div>
      </nav>
    </header>
  );
}
