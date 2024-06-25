import imgLarge1 from "./img/Home/slider_left.jpg";
import imgLarge2 from "./img/Home/100000_banner-subsidy-760x325-1.jpg";
import imgLarge3 from "./img/Home/100000_note8-760x325.jpg";
import { useEffect, useState, useRef } from "react";
import SliderTop from "./SliderTop";
import SliderBottom from "./SliderBottom";

function Slider() {
  const imgLarge = [imgLarge1, imgLarge2, imgLarge3];

  const [index, setIndex] = useState(0);
  const handleEventSlideLargeRef = useRef(null);

  const LargeRef = useRef(null);
  const [LargeWidth, setLargeWidth] = useState(0);

  useEffect(() => {
    function handleLarge() {
      if (LargeRef.current) {
        const width = LargeRef.current.offsetWidth;
        setLargeWidth(width);
      }
    }
    handleLarge();
    window.addEventListener("resize", handleLarge);
    return () => {
      window.removeEventListener("resize", handleLarge);
    };
  }, [LargeRef]);
  useEffect(() => {
    handleEventSlideLargeRef.current = setInterval(handleSlideLarge, 4000);
    return () => {
      clearInterval(handleEventSlideLargeRef.current);
    };
  }, [index]);
  function renderImgLarge() {
    if (imgLarge.length > 0) {
      return imgLarge.map((value, key) => {
        return (
          <div
            key={key}
            className="flex-0 flex-shrink-0 flex-grow-0 w-full"
            style={{ transform: `translateX(-${index * LargeWidth}px)` }}
          >
            <div className="item">
              <div className="left__item">
                <a href={value}>
                  <img className="img__carousel__left" src={value} alt="" />
                </a>
              </div>
              <div className="left__title text-center">
                {index === 0 ? (
                  <p>Minimum price from 8 million</p>
                ) : index === 1 ? (
                  <p>Mobi Mega - Phone discount from 9 million</p>
                ) : (
                  <p>Galaxy Note8 with up to 8 million discount</p>
                )}
              </div>
            </div>
          </div>
        );
      });
    }
  }
  function handleSlideLarge() {
    setIndex((prevIndex) =>
      prevIndex === imgLarge.length - 1 ? 0 : prevIndex + 1
    );
  }
  const handleBtnLeftLarge = () => {
    clearInterval(handleEventSlideLargeRef.current);
    if (index === 0) {
      setIndex(imgLarge.length - 1);
    } else {
      setIndex(index - 1);
    }
    handleEventSlideLargeRef.current = setInterval(handleSlideLarge, 4000);
  };
  const handleBtnRightLarge = () => {
    handleSlideLarge();
    clearInterval(handleEventSlideLargeRef.current);
    handleEventSlideLargeRef.current = setInterval(handleSlideLarge, 4000);
  };
  return (
    <section id="slider" className="pb-[30px] md:pt-[100px] lg:pt-[190px]">
      <div className="max-w-[1280px] mx-auto px-3">
        <div className="grid grid-cols-12">
          <div className="col-span-8 px-3">
            <div className="slide__show">
              <div className="carousel__left">
                <div className="carousel__left__content" ref={LargeRef}>
                  {renderImgLarge()}
                </div>
                <div className="btns">
                  <a
                    href="#"
                    className="left btn__left button"
                    onClick={handleBtnLeftLarge}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 320 512"
                    >
                      <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="right btn__right button"
                    onClick={handleBtnRightLarge}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 320 512"
                    >
                      <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-4 px-3">
            <div className="grid grid-cols-1">
              <SliderTop />
              <SliderBottom />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Slider;
