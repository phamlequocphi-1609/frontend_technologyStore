import imgBottom1 from "./img/Home/slider_right_4.jpg";
import imgBottom2 from "./img/Home/slide_right_5.jpg";
import imgBottom3 from "./img/Home/slide_right_6.jpg";
import { useEffect, useRef, useState } from "react";
function SliderBottom() {
  const imgBottom = [imgBottom1, imgBottom2, imgBottom3];
  const BottomRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [index, setIndex] = useState(0);
  const handleEventSlideBottom = useRef(null);
  useEffect(() => {
    function handleBottom() {
      if (BottomRef.current) {
        const width = BottomRef.current.offsetWidth;
        setWidth(width);
      }
    }
    handleBottom();
    window.addEventListener("resize", handleBottom);
    return () => window.removeEventListener("resize", handleBottom);
  }, [BottomRef]);
  useEffect(() => {
    handleEventSlideBottom.current = setInterval(handleBottom, 6000);
    return () => {
      clearInterval(handleEventSlideBottom.current);
    };
  }, [index]);
  function renderImgBottom() {
    if (imgBottom.length > 0) {
      return imgBottom.map((value, key) => {
        return (
          <div
            key={key}
            className="flex-0 flex-shrink-0 flex-grow-0 w-full"
            style={{ transform: `translateX(-${index * width}px)` }}
          >
            <div className="item">
              <a href={value}>
                <img className="img__carousel__bottom" src={value} alt="" />
              </a>
            </div>
          </div>
        );
      });
    }
  }
  function handleBottom() {
    if (index === imgBottom.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  }
  function handleLeft() {
    clearInterval(handleEventSlideBottom.current);
    if (index === 0) {
      setIndex(imgBottom.length - 1);
    } else {
      setIndex(index - 1);
    }
    handleEventSlideBottom.current = setInterval(handleBottom, 6000);
  }
  function handleRight() {
    clearInterval(handleEventSlideBottom.current);
    handleBottom();
    handleEventSlideBottom.current = setInterval(handleBottom, 6000);
  }
  function renderIndexItem() {
    if (imgBottom.length > 0) {
      return imgBottom.map((value, key) => {
        return (
          <div
            key={key}
            className={`index__item__bottom ${key === index ? "active" : ""}`}
            id={`index__item__bottom__${key}`}
          ></div>
        );
      });
    }
  }
  return (
    <div className="col-span-1">
      <div className="slide__show__bottom">
        <div className="carousel__right__bottom" ref={BottomRef}>
          {renderImgBottom()}
        </div>
        <div className="btns">
          <a href="#" className="left btn__left button" onClick={handleLeft}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 320 512"
            >
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
            </svg>
          </a>
          <a href="#" className="right btn__right button" onClick={handleRight}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 320 512"
            >
              <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
            </svg>
          </a>
        </div>
        <div className="img__carouel__index__bottom">{renderIndexItem()}</div>
      </div>
    </div>
  );
}
export default SliderBottom;
