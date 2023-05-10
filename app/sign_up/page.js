"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();

  const [nameVal, setNameVal] = useState("");
  const [emailVal, setEmailVal] = useState("");
  const [passwordVal, setPasswordVal] = useState("");
  const [confirmPasswordVal, setConfirmPasswordVal] = useState("");

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPassordRef = useRef();

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  const onHandleBtn = (e) => {
    e.preventDefault();

    if (passwordVal !== confirmPasswordVal) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다, 확인해주세요.");
      passwordRef.current.focus();
      return;
    }

    fetch("/api/sign_up/insert", {
      method: "POST",
      body: JSON.stringify({
        name: nameVal,
        email: emailVal,
        password: passwordVal,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success === false) {
          if (res.type === "name") {
            alert("Duplicate name Please use a different name.");
            nameRef.current.focus();
            return;
          }

          alert("Duplicate email Please use a different email.");
          emailRef.current.focus();
          return;
        }

        alert(res.data);
        router.push("/");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className='container sign-up-page'>
      <h1 className='page-title'>Sign Up</h1>
      <form onSubmit={onHandleBtn}>
        <div>
          <label htmlFor='name'>
            Name <span>*</span>
          </label>
          <input
            id='name'
            type='text'
            value={nameVal}
            ref={nameRef}
            required
            maxLength={20}
            onChange={(e) => setNameVal(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor='email'>
            Email <span>*</span>
          </label>
          <input
            id='email'
            type='email'
            value={emailVal}
            ref={emailRef}
            required
            maxLength={30}
            onChange={(e) => setEmailVal(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor='password'>
            Password <span>*</span>
          </label>
          <input
            id='password'
            type='password'
            value={passwordVal}
            ref={passwordRef}
            placeholder='At least 6 characters'
            required
            minLength={6}
            onChange={(e) => setPasswordVal(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor='confirm-password'>
            Confirm Password <span>*</span>
          </label>
          <input
            id='confirm-password'
            type='password'
            value={confirmPasswordVal}
            ref={confirmPassordRef}
            required
            minLength={6}
            onChange={(e) => setConfirmPasswordVal(e.target.value)}
          />
        </div>
        <button className='btn btn-lg' type='submit' onSubmit={onHandleBtn}>
          Sign Up
        </button>
      </form>
    </div>
  );
}
