"use client";

import { signIn, signOut } from "next-auth/react";
import { FaAngleDown } from "react-icons/fa";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function SignInOutBtn({ session, signedUser }) {
  const [userName, setUserName] = useState("");

  const [IsNavShow, setIsNavShow] = useState(false);
  const navRef = useRef();

  const getUser = async () => {
    const res = await fetch(`/api/user_info/get?_id=${signedUser?._id}`);
    const json = await res.json();
    setUserName(json.data.name);
  };

  useEffect(() => {
    if (signedUser) {
      getUser();
    }
  }, [session]);

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
          {userName}
          <img src={session.user.image} alt={session.user.name} />
          <FaAngleDown className='fa-angle-down' />
          <nav ref={navRef} style={{ display: IsNavShow ? "block" : "none" }}>
            <ul>
              <li>
                <Link href={`/my_page/${signedUser?._id}?search=my_profile`}>
                  My Page
                </Link>
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
