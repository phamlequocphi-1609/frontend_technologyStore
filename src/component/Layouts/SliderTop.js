import { useEffect, useLayoutEffect, useRef, useState } from "react";
import imgTop1 from "./img/Home/slide_right1.jpg";
import imgTop2 from "./img/Home/slide_right2.jpg";
import imgTop3 from "./img/Home/slider_right_3.jpg";
function SliderTop() {
  const imgTop = [imgTop1, imgTop2, imgTop3];
  const TopRef = useRef(null);
  const [TopWidth, setTopWidth] = useState(0);
  const [index, setIndex] = useState(0);
  const handleEventSlideTop = useRef(null);
  useEffect(() => {
    function handleTop() {
      if (TopRef.current) {
        const width = TopRef.current.offsetWidth;
        setTopWidth(width);
      }
    }
    handleTop();
    window.addEventListener("resize", handleTop);
    return () => window.removeEventListener("resize", handleTop);
  }, [TopRef]);
  useEffect(() => {
    handleEventSlideTop.current = setInterval(handleSlideTop, 5000);
    return () => {
      clearInterval(handleEventSlideTop.current);
    };
  }, [index]);
  function renderImgTop() {
    if (imgTop.length > 0) {
      return imgTop.map((value, key) => {
        return (
          <div
            key={key}
            className="flex-0 flex-shrink-0 flex-grow-0 w-full"
            style={{ transform: `translateX(-${index * TopWidth}px)` }}
          >
            <div className="item">
              <a href={value}>
                <img className="img__carousel__top" src={value} alt="" />
              </a>
            </div>
          </div>
        );
      });
    }
  }
  function handleSlideTop() {
    if (index === imgTop.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  }

  const handleBtnLeftTop = () => {
    clearInterval(handleEventSlideTop.current);
    if (index === 0) {
      setIndex(imgTop.length - 1);
    } else {
      setIndex(index - 1);
    }
    handleEventSlideTop.current = setInterval(handleSlideTop, 5000);
  };
  const handleBtnRightTop = () => {
    clearInterval(handleEventSlideTop.current);
    handleSlideTop();
    handleEventSlideTop.current = setInterval(handleSlideTop, 5000);
  };
  function renderIndexItem() {
    if (imgTop.length > 0) {
      return imgTop.map(function (value, key) {
        return (
          <div
            key={key}
            className={`index__item__top ${key === index ? "active" : ""}`}
            id={`index__item__top__${key}`}
          ></div>
        );
      });
    }
  }
  return (
    <div className="col-span-1">
      <div className="slide__show__top">
        <div
          id="top__carousel"
          className="carousel__right__top pb-3.5"
          ref={TopRef}
        >
          {renderImgTop()}
        </div>
        <div className="btns">
          <a
            href="#"
            className="left btn__left button"
            onClick={handleBtnLeftTop}
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
            onClick={handleBtnRightTop}
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
        <div className="img__carouel__index__top">{renderIndexItem()}</div>
      </div>
    </div>
  );
}
export default SliderTop;
