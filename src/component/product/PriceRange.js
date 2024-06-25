import React, { useState, useEffect } from "react";
import Api from "../../Api";
import { useNavigate } from "react-router-dom";

const PriceRange = () => {
  const navigate = useNavigate();
  const sliderMaxVal = 100000000;
  const start = 6000;
  const [slider1Value, setSlider1Value] = useState(10000000);
  const [slider2Value, setSlider2Value] = useState(30000000);
  const [data, setData] = useState([]);
  function renderColor() {
    const percent1 = (slider1Value / sliderMaxVal) * 100;
    const percent2 = (slider2Value / sliderMaxVal) * 100;
    const slideMonitorStyle = `linear-gradient(to right, #dadae5 ${percent1}%, #3264fe ${percent1}%, #3264fe ${percent2}%, #dadae5 ${percent2}%)`;
    return { background: slideMonitorStyle };
  }
  const handleSlider1Change = (e) => {
    const newVal = parseInt(e.target.value, 10);
    if (slider2Value - newVal <= start) {
      setSlider1Value(slider2Value - start);
    } else {
      setSlider1Value(newVal);
    }
  };
  function handleSlider2Change(e) {
    const newVal = parseInt(e.target.value, 10);
    if (newVal - slider1Value <= start) {
      setSlider2Value(slider1Value + start);
    } else {
      setSlider2Value(newVal);
    }
  }
  function handleProductPriceRange() {
    navigate("/product/priceRange", {
      state: { data },
    });
  }
  useEffect(() => {
    renderColor();
    const delayTime = setTimeout(() => {
      Api.get(`/product/priceRange?price=${slider1Value}-${slider2Value}`)
        .then((response) => {
          console.log(response);
          setData(response.data.data);
        })
        .catch((error) => console.log(error));
    }, 300);
    return () => clearTimeout(delayTime);
  }, [slider1Value, slider2Value]);
  return (
    <div className="price__range">
      <h2>
        <img src={require("../Layouts/img/Home/price_icon.png")} alt="" />
        Price Range
      </h2>
      <div className="range__content relative">
        <div
          onClick={handleProductPriceRange}
          className="absolute bottom-2 left-[50%] translate-x-[-50%] bg-[#2e3192] p-1 cursor-pointer"
        >
          <p className="uppercase text-[#fff] text-[16px]">Filter</p>
        </div>
        <div className="values">
          <span id="range1">{slider1Value.toLocaleString("vi-VN")} đ</span>
          <span> ‐ </span>
          <span id="range2">{slider2Value.toLocaleString("vi-VN")}</span>
        </div>
        <div className="range__border">
          <div className="slide__monitor" style={renderColor()} />
          <input
            type="range"
            min={0}
            max={sliderMaxVal}
            value={slider1Value}
            onChange={handleSlider1Change}
            id="slider-1"
          />
          <input
            type="range"
            min={0}
            max={sliderMaxVal}
            value={slider2Value}
            onChange={handleSlider2Change}
            id="slider-2"
          />
        </div>
      </div>
    </div>
  );
};

export default PriceRange;
