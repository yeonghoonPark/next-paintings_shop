"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingPage from "@/app/loading";

export default function MyProfileSection({ session, signedUser }) {
  const router = useRouter();

  const [nameVal, setNameVal] = useState("");
  const nameRef = useRef();

  const [isLoading, setIsLoading] = useState(false);

  const getUser = async () => {
    const res = await fetch(`/api/user_info/get?_id=${signedUser._id}`);
    const json = await res.json();
    setNameVal(json.data.name);
    setIsLoading(true);
  };

  useEffect(() => {
    getUser();
  }, []);

  const onHandleSaveBtn = () => {
    fetch("/api/user_info/update", {
      method: "PUT",
      body: JSON.stringify({
        name: nameVal,
        email: session?.user?.email,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success === false) {
          alert(res.data);
          nameRef.current.focus();
          return;
        }

        alert(res.data);
        router.refresh();
      })
      .catch((err) => console.error(err));
  };

  return (
    <section className='my-profile-section'>
      <div className='title-part'>
        <h3>
          The Name is reflected in the payment, use your real name or any name
          you want.
        </h3>
        <p>※ email cannot be changed.</p>
      </div>
      {!isLoading ? (
        LoadingPage()
      ) : (
        <>
          <form>
            <div>
              <label htmlFor='name'>Name</label>
              <input
                id='name'
                type='text'
                value={nameVal}
                ref={nameRef}
                required
                maxLength={20}
                onChange={(e) => setNameVal(e.currentTarget.value)}
              />
            </div>
            <div>
              <label htmlFor='email'>Email</label>
              <input
                id='email'
                type='email'
                value={session?.user?.email}
                readOnly
                disabled
              />
            </div>
          </form>
          <div className='btn-group'>
            <button
              type='text'
              className='btn btn-md'
              onClick={onHandleSaveBtn}
            >
              Save Changes
            </button>
          </div>
        </>
      )}
    </section>
  );
}
