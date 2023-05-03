"use client";

import { useEffect, useRef, useState } from "react";

export default function Slider() {
  let [zero, setZero] = useState(0);
  const intervalRef = useRef();
  const slideText = [
    "Learn to be Happy",
    "Enjoy various Paintings",
    "New Oil paintings are in stock!!",
    "People who try are Beautiful",
    "Welcome to Painting's Shop",
  ];
  const CLASS_NAME_SLIDE_ACTIVE = "slide-active";
  const CLASS_NAME_SLIDE_TEXT = "slide-text";

  const setSlide = () => {
    const slides = document.querySelectorAll(".slide");
    intervalRef.current = setInterval(() => {
      slides.forEach((_cV) => _cV.classList.remove(CLASS_NAME_SLIDE_ACTIVE));
      if (zero > 4) zero = 0;
      slides[zero++].classList.add(CLASS_NAME_SLIDE_ACTIVE);
    }, 7000);
  };

  const createHTMLString = () => {
    const result = [];
    for (let i = 0; i < 5; i++) {
      result.push(
        <div
          className={i === 4 ? `slide ${CLASS_NAME_SLIDE_ACTIVE}` : "slide"}
          key={i}
        >
          <span
            className={`
            ${CLASS_NAME_SLIDE_TEXT} 
            ${CLASS_NAME_SLIDE_TEXT}0${i + 1}
            `}
          >
            {slideText[i]}
          </span>
          <img
            src={`/images/slider/slide_0${i + 1}.jpg`}
            alt={`slide_0${i + 1}`}
          />
        </div>,
      );
    }
    return result;
  };

  useEffect(() => {
    setSlide();
    return () => clearInterval(intervalRef.current);
  }, []);

  return <section className='slider'>{createHTMLString()}</section>;
}
