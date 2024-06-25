import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Api from "../../Api";
import AddCart from "./AddCart";
function ProductCategoryBrand() {
  const [iphoneData, setIphoneData] = useState([]);
  const [samsungData, setSamsungData] = useState([]);
  const [xiaomi, setXiaomi] = useState([]);
  const [macbook, setMacbook] = useState([]);
  const [laptopdell, setLaptopdell] = useState([]);
  const [asus, setAsus] = useState([]);
  const [ipad, setIpad] = useState([]);
  const [tabletSamsung, setTabletSamsung] = useState([]);
  const [headphone, setHeadphone] = useState([]);
  const [speaker, setSpeaker] = useState([]);
  const [sortOrder, setSortOrder] = useState("default");
  let params = useParams();
  let paramsCategory = params.category;
  let paramsBrand = params.brand;
  useEffect(() => {
    Api.get("/product")
      .then((response) => {
        setIphoneData(response.data.data.filter((item) => item.id_brand === 1));
        setSamsungData(
          response.data.data.filter((item) => item.company === "Samsung")
        );
        setXiaomi(response.data.data.filter((item) => item.id_brand === 3));
        setMacbook(response.data.data.filter((item) => item.id_brand === 4));
        setLaptopdell(response.data.data.filter((item) => item.id_brand === 7));
        setAsus(response.data.data.filter((item) => item.id_brand === 8));
        setIpad(response.data.data.filter((item) => item.id_brand === 9));
        setTabletSamsung(
          response.data.data.filter((item) => item.id_brand === 10)
        );
        setHeadphone(response.data.data.filter((item) => item.id_brand === 11));
        setSpeaker(response.data.data.filter((item) => item.id_brand === 12));
      })
      .catch((error) => console.log(error));
  }, []);
  const sortProduct = (product) => {
    return product.sort((a, b) => {
      const priceA = a.status === 1 ? a.price * (1 - a.sale / 100) : a.price;
      const priceB = b.status === 1 ? b.price * (1 - b.sale / 100) : b.price;
      if (sortOrder === "low-to-high") {
        return priceA - priceB;
      } else if (sortOrder === "high-to-low") {
        return priceB - priceA;
      }
    });
  };
  function handleSortChange(e) {
    setSortOrder(e.target.value);
  }
  const renderIphone = () => {
    if (Object.keys(iphoneData).length > 0) {
      const sortData = sortProduct([...iphoneData]);
      return sortData.map((value, key) => {
        const imgArr = JSON.parse(value.image);
        const firstImg = imgArr[0];
        const currentPrice = value.price * (1 - value.sale / 100);
        let addcart;
        let saleImg;
        let priceStatus;
        if (value.status === 1) {
          saleImg = (
            <img
              className="w-[60px] absolute top-1 left-1"
              src={require("../Layouts/img/Home/sale_icon.png")}
            />
          );
          priceStatus = (
            <div className="price__wrapper">
              <span className="price__old">
                {value.price.toLocaleString("vi-VN")}đ
              </span>
              <span className="price__current">
                {currentPrice.toLocaleString("vi-VN")}đ
              </span>
            </div>
          );

          addcart = <AddCart id={value.id} price={currentPrice} />;
        } else {
          saleImg = null;
          priceStatus = (
            <div className="price__wrapper">
              <span className="price__current">
                {value.price.toLocaleString("vi-VN")}đ
              </span>
            </div>
          );

          addcart = <AddCart id={value.id} price={value.price} />;
        }
        return (
          <div className="col-span-3 pl-2 pr-2" key={key}>
            <div className="product__img__wrapper relative">
              {saleImg}
              <div className="product__info">
                <img
                  src={
                    "http://localhost:8800/my-shop/public/upload/product/" +
                    value.id_user +
                    "/" +
                    firstImg
                  }
                  alt=""
                />
                <div className="product__content">
                  <p>{value.name}</p>
                  {priceStatus}
                  {addcart}
                </div>
              </div>
              <div className="choose">
                <ul className="nav__justified">
                  <li>
                    <a href>
                      <svg
                        className="heart"
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 512 512"
                      >
                        <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                      </svg>
                      Add to wishlist
                    </a>
                  </li>
                  <li>
                    <Link>
                      <img
                        className="product__detail"
                        src={require("../Layouts/img/Home/details.png")}
                        alt=""
                      />
                      Product detail
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );
      });
    }
  };
  const renderSamsung = () => {
    if (Object.keys(samsungData).length > 0) {
      const sortData = sortProduct([...samsungData]);
      return sortData.map((value, key) => {
        const imgArr = JSON.parse(value.image);
        const firstImg = imgArr[0];
        const currentPrice = value.price * (1 - value.sale / 100);
        let addcart;
        let saleImg;
        let priceStatus;
        if (value.status === 1) {
          saleImg = (
            <img
              className="w-[60px] absolute top-1 left-1"
              src={require("../Layouts/img/Home/sale_icon.png")}
            />
          );
          priceStatus = (
            <div className="price__wrapper">
              <span className="price__old">
                {value.price.toLocaleString("vi-VN")}đ
              </span>
              <span className="price__current">
                {currentPrice.toLocaleString("vi-VN")}đ
              </span>
            </div>
          );
          addcart = <AddCart id={value.id} price={currentPrice} />;
        } else {
          saleImg = null;
          priceStatus = (
            <div className="price__wrapper">
              <span className="price__current">
                {value.price.toLocaleString("vi-VN")}đ
              </span>
            </div>
          );

          addcart = <AddCart id={value.id} price={value.price} />;
        }
        return (
          <div className="col-span-3 pl-2 pr-2" key={key}>
            <div className="product__img__wrapper relative">
              {saleImg}
              <div className="product__info">
                <img
                  src={
                    "http://localhost:8800/my-shop/public/upload/product/" +
                    value.id_user +
                    "/" +
                    firstImg
                  }
                  alt=""
                />
                <div className="product__content">
                  <p>{value.name}</p>
                  {priceStatus}
                  {addcart}
                </div>
              </div>
              <div className="choose">
                <ul className="nav__justified">
                  <li>
                    <a href>
                      <svg
                        className="heart"
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 512 512"
                      >
                        <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                      </svg>
                      Add to wishlist
                    </a>
                  </li>
                  <li>
                    <Link>
                      <img
                        className="product__detail"
                        src={require("../Layouts/img/Home/details.png")}
                        alt=""
                      />
                      Product detail
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );
      });
    }
  };
  function renderxiaomi() {
    if (Object.keys(xiaomi).length > 0) {
      const sortData = sortProduct([...xiaomi]);
      return sortData.map((value, key) => {
        const imgArr = JSON.parse(value.image);
        const firstImg = imgArr[0];
        const currentPrice = value.price * (1 - value.sale / 100);
        let addcart;
        let saleImg;
        let priceStatus;
        if (value.status === 1) {
          saleImg = (
            <img
              className="w-[60px] absolute top-1 left-1"
              src={require("../Layouts/img/Home/sale_icon.png")}
            />
          );
          priceStatus = (
            <div className="price__wrapper">
              <span className="price__old">
                {value.price.toLocaleString("vi-VN")}đ
              </span>
              <span className="price__current">
                {currentPrice.toLocaleString("vi-VN")}đ
              </span>
            </div>
          );
          addcart = <AddCart id={value.id} price={currentPrice} />;
        } else {
          saleImg = null;
          priceStatus = (
            <div className="price__wrapper">
              <span className="price__current">
                {value.price.toLocaleString("vi-VN")}đ
              </span>
            </div>
          );

          addcart = <AddCart id={value.id} price={value.price} />;
        }
        return (
          <div className="col-span-3 pl-2 pr-2" key={key}>
            <div className="product__img__wrapper relative">
              {saleImg}
              <div className="product__info">
                <img
                  src={
                    "http://localhost:8800/my-shop/public/upload/product/" +
                    value.id_user +
                    "/" +
                    firstImg
                  }
                  alt=""
                />
                <div className="product__content">
                  <p>{value.name}</p>
                  {priceStatus}
                  {addcart}
                </div>
              </div>
              <div className="choose">
                <ul className="nav__justified">
                  <li>
                    <a href>
                      <svg
                        className="heart"
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 512 512"
                      >
                        <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                      </svg>
                      Add to wishlist
                    </a>
                  </li>
                  <li>
                    <Link>
                      <img
                        className="product__detail"
                        src={require("../Layouts/img/Home/details.png")}
                        alt=""
                      />
                      Product detail
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );
      });
    }
  }
  function renderMacbook() {
    if (Object.keys(macbook).length > 0) {
      const sortData = sortProduct([...macbook]);
      return sortData.map((value, key) => {
        const imgArr = JSON.parse(value.image);
        const firstImg = imgArr[0];
        const currentPrice = value.price * (1 - value.sale / 100);
        let addcart;
        let saleImg;
        let priceStatus;
        if (value.status === 1) {
          saleImg = (
            <img
              className="w-[60px] absolute top-1 left-1"
              src={require("../Layouts/img/Home/sale_icon.png")}
            />
          );
          priceStatus = (
            <div className="price__wrapper">
              <span className="price__old">
                {value.price.toLocaleString("vi-VN")}đ
              </span>
              <span className="price__current">
                {currentPrice.toLocaleString("vi-VN")}đ
              </span>
            </div>
          );
          addcart = <AddCart id={value.id} price={currentPrice} />;
        } else {
          saleImg = null;
          priceStatus = (
            <div className="price__wrapper">
              <span className="price__current">
                {value.price.toLocaleString("vi-VN")}đ
              </span>
            </div>
          );

          addcart = <AddCart id={value.id} price={value.price} />;
        }
        return (
          <div className="col-span-3 pl-2 pr-2" key={key}>
            <div className="product__img__wrapper relative">
              {saleImg}
              <div className="product__info">
                <img
                  src={
                    "http://localhost:8800/my-shop/public/upload/product/" +
                    value.id_user +
                    "/" +
                    firstImg
                  }
                  alt=""
                />
                <div className="product__content">
                  <p>{value.name}</p>
                  {priceStatus}
                  {addcart}
                </div>
              </div>
              <div className="choose">
                <ul className="nav__justified">
                  <li>
                    <a href>
                      <svg
                        className="heart"
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 512 512"
                      >
                        <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                      </svg>
                      Add to wishlist
                    </a>
                  </li>
                  <li>
                    <Link>
                      <img
                        className="product__detail"
                        src={require("../Layouts/img/Home/details.png")}
                        alt=""
                      />
                      Product detail
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );
      });
    }
  }
  const renderDell = () => {
    if (laptopdell.length > 0) {
      const sortData = sortProduct([...laptopdell]);
      return sortData.map((value, key) => {
        const imgArr = JSON.parse(value.image);
        const firstImg = imgArr[0];
        const currentPrice = value.price * (1 - value.sale / 100);
        let addcart;
        let saleImg;
        let priceStatus;
        if (value.status === 1) {
          saleImg = (
            <img
              className="w-[60px] absolute top-1 left-1"
              src={require("../Layouts/img/Home/sale_icon.png")}
            />
          );
          priceStatus = (
            <div className="price__wrapper">
              <span className="price__old">
                {value.price.toLocaleString("vi-VN")}đ
              </span>
              <span className="price__current">
                {currentPrice.toLocaleString("vi-VN")}đ
              </span>
            </div>
          );
          addcart = <AddCart id={value.id} price={currentPrice} />;
        } else {
          saleImg = null;
          priceStatus = (
            <div className="price__wrapper">
              <span className="price__current">
                {value.price.toLocaleString("vi-VN")}đ
              </span>
            </div>
          );

          addcart = <AddCart id={value.id} price={value.price} />;
        }
        return (
          <div className="col-span-3 pl-2 pr-2" key={key}>
            <div className="product__img__wrapper relative">
              {saleImg}
              <div className="product__info">
                <img
                  src={
                    "http://localhost:8800/my-shop/public/upload/product/" +
                    value.id_user +
                    "/" +
                    firstImg
                  }
                  alt=""
                />
                <div className="product__content">
                  <p>{value.name}</p>
                  {priceStatus}
                  {addcart}
                </div>
              </div>
              <div className="choose">
                <ul className="nav__justified">
                  <li>
                    <a href>
                      <svg
                        className="heart"
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 512 512"
                      >
                        <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                      </svg>
                      Add to wishlist
                    </a>
                  </li>
                  <li>
                    <Link>
                      <img
                        className="product__detail"
                        src={require("../Layouts/img/Home/details.png")}
                        alt=""
                      />
                      Product detail
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );
      });
    }
  };
  function renderAsus() {
    if (asus.length > 0) {
      const sortData = sortProduct([...asus]);
      return sortData.map((value, key) => {
        const imgArr = JSON.parse(value.image);
        const firstImg = imgArr[0];
        const currentPrice = value.price * (1 - value.sale / 100);
        let addcart;
        let saleImg;
        let priceStatus;
        if (value.status === 1) {
          saleImg = (
            <img
              className="w-[60px] absolute top-1 left-1"
              src={require("../Layouts/img/Home/sale_icon.png")}
            />
          );
          priceStatus = (
            <div className="price__wrapper">
              <span className="price__old">
                {value.price.toLocaleString("vi-VN")}đ
              </span>
              <span className="price__current">
                {currentPrice.toLocaleString("vi-VN")}đ
              </span>
            </div>
          );
          addcart = <AddCart id={value.id} price={currentPrice} />;
        } else {
          saleImg = null;
          priceStatus = (
            <div className="price__wrapper">
              <span className="price__current">
                {value.price.toLocaleString("vi-VN")}đ
              </span>
            </div>
          );

          addcart = <AddCart id={value.id} price={value.price} />;
        }
        return (
          <div className="col-span-3 pl-2 pr-2" key={key}>
            <div className="product__img__wrapper relative">
              {saleImg}
              <div className="product__info">
                <img
                  src={
                    "http://localhost:8800/my-shop/public/upload/product/" +
                    value.id_user +
                    "/" +
                    firstImg
                  }
                  alt=""
                />
                <div className="product__content">
                  <p>{value.name}</p>
                  {priceStatus}
                  {addcart}
                </div>
              </div>
              <div className="choose">
                <ul className="nav__justified">
                  <li>
                    <a href>
                      <svg
                        className="heart"
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 512 512"
                      >
                        <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                      </svg>
                      Add to wishlist
                    </a>
                  </li>
                  <li>
                    <Link>
                      <img
                        className="product__detail"
                        src={require("../Layouts/img/Home/details.png")}
                        alt=""
                      />
                      Product detail
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );
      });
    }
  }
  const renderIpad = () => {
    if (ipad.length > 0) {
      const sortData = sortProduct([...ipad]);
      return sortData.map((value, key) => {
        const imgArr = JSON.parse(value.image);
        const firstImg = imgArr[0];
        const currentPrice = value.price * (1 - value.sale / 100);
        let addcart;
        let saleImg;
        let priceStatus;
        if (value.status === 1) {
          saleImg = (
            <img
              className="w-[60px] absolute top-1 left-1"
              src={require("../Layouts/img/Home/sale_icon.png")}
            />
          );
          priceStatus = (
            <div className="price__wrapper">
              <span className="price__old">
                {value.price.toLocaleString("vi-VN")}đ
              </span>
              <span className="price__current">
                {currentPrice.toLocaleString("vi-VN")}đ
              </span>
            </div>
          );
          addcart = <AddCart id={value.id} price={currentPrice} />;
        } else {
          saleImg = null;
          priceStatus = (
            <div className="price__wrapper">
              <span className="price__current">
                {value.price.toLocaleString("vi-VN")}đ
              </span>
            </div>
          );

          addcart = <AddCart id={value.id} price={value.price} />;
        }
        return (
          <div className="col-span-3 pl-2 pr-2" key={key}>
            <div className="product__img__wrapper relative">
              {saleImg}
              <div className="product__info">
                <img
                  src={
                    "http://localhost:8800/my-shop/public/upload/product/" +
                    value.id_user +
                    "/" +
                    firstImg
                  }
                  alt=""
                />
                <div className="product__content">
                  <p>{value.name}</p>
                  {priceStatus}
                  {addcart}
                </div>
              </div>
              <div className="choose">
                <ul className="nav__justified">
                  <li>
                    <a href>
                      <svg
                        className="heart"
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 512 512"
                      >
                        <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                      </svg>
                      Add to wishlist
                    </a>
                  </li>
                  <li>
                    <Link>
                      <img
                        className="product__detail"
                        src={require("../Layouts/img/Home/details.png")}
                        alt=""
                      />
                      Product detail
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );
      });
    }
  };
  function renderTaletSamsung() {
    if (tabletSamsung.length > 0) {
      const sortData = sortProduct([...tabletSamsung]);
      return sortData.map((value, key) => {
        const imgArr = JSON.parse(value.image);
        const firstImg = imgArr[0];
        const currentPrice = value.price * (1 - value.sale / 100);
        let addcart;
        let saleImg;
        let priceStatus;
        if (value.status === 1) {
          saleImg = (
            <img
              className="w-[60px] absolute top-1 left-1"
              src={require("../Layouts/img/Home/sale_icon.png")}
            />
          );
          priceStatus = (
            <div className="price__wrapper">
              <span className="price__old">
                {value.price.toLocaleString("vi-VN")}đ
              </span>
              <span className="price__current">
                {currentPrice.toLocaleString("vi-VN")}đ
              </span>
            </div>
          );
          addcart = <AddCart id={value.id} price={currentPrice} />;
        } else {
          saleImg = null;
          priceStatus = (
            <div className="price__wrapper">
              <span className="price__current">
                {value.price.toLocaleString("vi-VN")}đ
              </span>
            </div>
          );

          addcart = <AddCart id={value.id} price={value.price} />;
        }
        return (
          <div className="col-span-3 pl-2 pr-2" key={key}>
            <div className="product__img__wrapper relative">
              {saleImg}
              <div className="product__info">
                <img
                  src={
                    "http://localhost:8800/my-shop/public/upload/product/" +
                    value.id_user +
                    "/" +
                    firstImg
                  }
                  alt=""
                />
                <div className="product__content">
                  <p>{value.name}</p>
                  {priceStatus}
                  {addcart}
                </div>
              </div>
              <div className="choose">
                <ul className="nav__justified">
                  <li>
                    <a href>
                      <svg
                        className="heart"
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 512 512"
                      >
                        <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                      </svg>
                      Add to wishlist
                    </a>
                  </li>
                  <li>
                    <Link>
                      <img
                        className="product__detail"
                        src={require("../Layouts/img/Home/details.png")}
                        alt=""
                      />
                      Product detail
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );
      });
    }
  }
  const renderheadphone = () => {
    if (headphone.length > 0) {
      const sortData = sortProduct([...headphone]);
      return sortData.map((value, key) => {
        const imgArr = JSON.parse(value.image);
        const firstImg = imgArr[0];
        const currentPrice = value.price * (1 - value.sale / 100);
        let addcart;
        let saleImg;
        let priceStatus;
        if (value.status === 1) {
          saleImg = (
            <img
              className="w-[60px] absolute top-1 left-1"
              src={require("../Layouts/img/Home/sale_icon.png")}
            />
          );
          priceStatus = (
            <div className="price__wrapper">
              <span className="price__old">
                {value.price.toLocaleString("vi-VN")}đ
              </span>
              <span className="price__current">
                {currentPrice.toLocaleString("vi-VN")}đ
              </span>
            </div>
          );
          addcart = <AddCart id={value.id} price={currentPrice} />;
        } else {
          saleImg = null;
          priceStatus = (
            <div className="price__wrapper">
              <span className="price__current">
                {value.price.toLocaleString("vi-VN")}đ
              </span>
            </div>
          );

          addcart = <AddCart id={value.id} price={value.price} />;
        }
        return (
          <div className="col-span-3 pl-2 pr-2" key={key}>
            <div className="product__img__wrapper relative">
              {saleImg}
              <div className="product__info">
                <img
                  src={
                    "http://localhost:8800/my-shop/public/upload/product/" +
                    value.id_user +
                    "/" +
                    firstImg
                  }
                  alt=""
                />
                <div className="product__content">
                  <p>{value.name}</p>
                  {priceStatus}
                  {addcart}
                </div>
              </div>
              <div className="choose">
                <ul className="nav__justified">
                  <li>
                    <a href>
                      <svg
                        className="heart"
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 512 512"
                      >
                        <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                      </svg>
                      Add to wishlist
                    </a>
                  </li>
                  <li>
                    <Link>
                      <img
                        className="product__detail"
                        src={require("../Layouts/img/Home/details.png")}
                        alt=""
                      />
                      Product detail
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );
      });
    }
  };
  function renderSpeaker() {
    if (speaker.length > 0) {
      const sortData = sortProduct([...speaker]);
      return sortData.map((value, key) => {
        const imgArr = JSON.parse(value.image);
        const firstImg = imgArr[0];
        const currentPrice = value.price * (1 - value.sale / 100);
        let addcart;
        let saleImg;
        let priceStatus;
        if (value.status === 1) {
          saleImg = (
            <img
              className="w-[60px] absolute top-1 left-1"
              src={require("../Layouts/img/Home/sale_icon.png")}
            />
          );
          priceStatus = (
            <div className="price__wrapper">
              <span className="price__old">
                {value.price.toLocaleString("vi-VN")}đ
              </span>
              <span className="price__current">
                {currentPrice.toLocaleString("vi-VN")}đ
              </span>
            </div>
          );
          addcart = <AddCart id={value.id} price={currentPrice} />;
        } else {
          saleImg = null;
          priceStatus = (
            <div className="price__wrapper">
              <span className="price__current">
                {value.price.toLocaleString("vi-VN")}đ
              </span>
            </div>
          );

          addcart = <AddCart id={value.id} price={value.price} />;
        }
        return (
          <div className="col-span-3 pl-2 pr-2" key={key}>
            <div className="product__img__wrapper relative">
              {saleImg}
              <div className="product__info">
                <img
                  src={
                    "http://localhost:8800/my-shop/public/upload/product/" +
                    value.id_user +
                    "/" +
                    firstImg
                  }
                  alt=""
                />
                <div className="product__content">
                  <p>{value.name}</p>
                  {priceStatus}
                  {addcart}
                </div>
              </div>
              <div className="choose">
                <ul className="nav__justified">
                  <li>
                    <a href>
                      <svg
                        className="heart"
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 512 512"
                      >
                        <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                      </svg>
                      Add to wishlist
                    </a>
                  </li>
                  <li>
                    <Link>
                      <img
                        className="product__detail"
                        src={require("../Layouts/img/Home/details.png")}
                        alt=""
                      />
                      Product detail
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );
      });
    }
  }
  return (
    <div className="col-span-12">
      <div className="discount">
        <div className="grid grid-cols-12 pb-3">
          <ul className=" col-span-7 flex pb-3">
            <li className="">
              <Link className="text-[18px] p-3">Home</Link>/
              <Link className="text-[18px] font-medium p-3">
                {paramsCategory}
              </Link>
              /{" "}
              <Link className="text-[18px] font-medium p-3">{paramsBrand}</Link>
            </li>
          </ul>
          <div className="col-span-5">
            <div className="grid grid-cols-12">
              <p className="col-span-6 text-[18px] p-2 text-center">
                View all {paramsBrand === "iphone" && iphoneData.length}{" "}
                {paramsBrand === "samsung" && samsungData.length}{" "}
                {paramsBrand === "xiaomi" && xiaomi.length}{" "}
                {paramsBrand === "macbook" && macbook.length}
                {paramsBrand === "laptop-dell" && laptopdell.length}{" "}
                {paramsBrand === "laptop-asus" && asus.length}{" "}
                {paramsBrand === "ipad" && ipad.length}{" "}
                {paramsBrand === "tablet-samsung" && tabletSamsung.length}{" "}
                {paramsBrand === "headphone" && headphone.length}{" "}
                {paramsBrand === "speaker" && speaker.length} products
              </p>
              <div className="col-span-6">
                <select
                  className=" ordering__select"
                  onChange={handleSortChange}
                  value={sortOrder}
                >
                  <option value="default" selected="selected">
                    Default order
                  </option>
                  <option value="low-to-high">
                    Order by price: Low to high
                  </option>
                  <option value="high-to-low">
                    Order by price: High to low
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 fade in">
          {paramsBrand === "iphone" && renderIphone()}
          {paramsBrand === "samsung" && renderSamsung()}
          {paramsBrand === "xiaomi" && renderxiaomi()}
          {paramsBrand === "macbook" && renderMacbook()}
          {paramsBrand === "laptop-dell" && renderDell()}
          {paramsBrand === "laptop-asus" && renderAsus()}
          {paramsBrand === "ipad" && renderIpad()}
          {paramsBrand === "tablet-samsung" && renderTaletSamsung()}
          {paramsBrand === "headphone" && renderheadphone()}
          {paramsBrand === "speaker" && renderSpeaker()}
        </div>
      </div>
    </div>
  );
}
export default ProductCategoryBrand;
