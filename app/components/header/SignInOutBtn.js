"use client";

import { signIn, signOut } from "next-auth/react";
import { FaAngleDown } from "react-icons/fa";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function SignInOutBtn({ session, signedUser }) {
  const navRef = useRef();
  const [IsNavShow, setIsNavShow] = useState(false);

  const onHandleNav = (e) => {
    if (IsNavShow && !navRef.current.contains(e.target)) setIsNavShow(false);
  };

  useEffect(() => {
    window.document.addEventListener("click", onHandleNav);
    return () => window.document.removeEventListener("click", onHandleNav);
  }, [IsNavShow]);

  if (session) {
    return (
      <div className='user' onClick={() => setIsNavShow(!IsNavShow)}>
        <div>
          {session.user.name}
          <img src={session.user.image} alt={session.user.name} />
          <FaAngleDown className='fa-angle-down' />
          <nav ref={navRef} style={{ display: IsNavShow ? "block" : "none" }}>
            <ul>
              <li>
                <Link href={`/user_info/${signedUser._id}`}>My Page</Link>
              </li>
              <li
                className='sign-out'
                onClick={() =>
                  signOut({ callbackUrl: `${window.location.origin}` })
                }
              >
                Sign Out
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  } else {
    return (
      <button className='sign-in' type='text' onClick={signIn}>
        Sign In
      </button>
    );
  }
}
