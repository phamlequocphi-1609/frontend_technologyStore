import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Api from "../Api";
import AddCart from "./product/AddCart";
import AddWishlist from "./product/AddWishlist";

function Home() {
  const [content, setContent] = useState("All");
  const [productAll, setProductAll] = useState([]);
  const [productNew, setProductNew] = useState([]);
  const [productSale, setProductSale] = useState([]);
  useEffect(() => {
    Api.get("/product")
      .then((response) => {
        setProductAll(response.data.data);
      })
      .catch((error) => console.log(error));

    Api.get("/product/new")
      .then((response) => {
        setProductNew(response.data.data);
      })
      .catch((error) => console.log(error));

    Api.get("/product/sale")
      .then((response) => {
        setProductSale(response.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  function handleClick(tabname) {
    setContent(tabname);
  }
  function activeProductall() {
    if (content === "All") {
      return (
        <li
          className="title__heading active__title mr-2"
          onClick={() => handleClick("All")}
        >
          Product All
        </li>
      );
    } else {
      return (
        <li className="title__heading mr-2" onClick={() => handleClick("All")}>
          Product All
        </li>
      );
    }
  }
  function activeProductNew() {
    if (content === "view") {
      return (
        <li
          className="title__heading active__title mr-2"
          onClick={() => handleClick("view")}
        >
          New Product
        </li>
      );
    } else {
      return (
        <li
          className="title__heading  mr-2"
          onClick={() => handleClick("view")}
        >
          New Product
        </li>
      );
    }
  }
  function activeProductSale() {
    if (content === "productSale") {
      return (
        <li
          className="title__heading active__title mr-2"
          onClick={() => handleClick("productSale")}
        >
          Discount Product
        </li>
      );
    } else {
      return (
        <li
          className="title__heading mr-2"
          onClick={() => handleClick("productSale")}
        >
          Discount Product
        </li>
      );
    }
  }
  const fetchDataProductAll = () => {
    if (productAll.length > 0) {
      return productAll.map((value, key) => {
        const imgArr = JSON.parse(value.image);
        const firstImg = imgArr[0];
        const currentPrice = value.price * (1 - value.sale / 100);
        let saleImg;
        let priceStatus;
        let addcart;
        if (value.status === 1) {
          saleImg = (
            <img
              className="w-[60px] absolute top-1 left-1"
              src={require("./Layouts/img/Home/sale_icon.png")}
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
          <div key={key} className="md:col-span-6 lg:col-span-4 px-3">
            <div className="product__img__wrapper relative">
              {saleImg}
              <div className="product__info ">
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
                    <AddWishlist id={value.id} />
                  </li>
                  <li>
                    <Link to={"/product/detail/" + value.id}>
                      <img
                        className="product__detail"
                        src={require("./Layouts/img/Home/details.png")}
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
  function renderProductAll() {
    if (content === "All") {
      return (
        <div className="grid grid-cols-12 fade in">{fetchDataProductAll()}</div>
      );
    } else {
      <div className="grid grid-cols-12 fade"></div>;
    }
  }
  function fetchProductNew() {
    if (Object.keys(productNew).length > 0) {
      return productNew.map((value, key) => {
        const imgArr = JSON.parse(value.image);
        const firstImg = imgArr[0];
        const currentPrice = value.price * (1 - value.sale / 100);
        let saleImg;
        let priceStatus;
        let addcart;
        if (value.status === 1) {
          saleImg = (
            <img
              className="w-[60px] absolute top-1 left-1"
              src={require("./Layouts/img/Home/sale_icon.png")}
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
          <div key={key} className="md:col-span-6 lg:col-span-4 px-3">
            <div className="product__img__wrapper relative">
              {saleImg}
              <div className="product__info ">
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
                    <AddWishlist id={value.id} />
                  </li>
                  <li>
                    <Link to={"/product/detail/" + value.id}>
                      <img
                        className="product__detail"
                        src={require("./Layouts/img/Home/details.png")}
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
  function renderProductView() {
    if (content === "view") {
      return (
        <div className="grid grid-cols-12 fade in">{fetchProductNew()}</div>
      );
    } else {
      <div className="grid grid-cols-12 fade"></div>;
    }
  }
  function fetchProductSale() {
    if (Object.keys(productSale).length > 0) {
      return productSale.map((value, key) => {
        const imgArr = JSON.parse(value.image);
        const firstImg = imgArr[0];
        const currentPrice = value.price * (1 - value.sale / 100);
        let saleImg;
        let priceStatus;
        let addcart;
        if (value.status === 1) {
          saleImg = (
            <img
              className="w-[60px] absolute top-1 left-1"
              src={require("./Layouts/img/Home/sale_icon.png")}
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
          <div key={key} className="md:col-span-6 lg:col-span-4 px-3">
            <div className="product__img__wrapper relative">
              {saleImg}
              <div className="product__info ">
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
                    <AddWishlist id={value.id} />
                  </li>
                  <li>
                    <Link to={"/product/detail/" + value.id}>
                      <img
                        className="product__detail"
                        src={require("./Layouts/img/Home/details.png")}
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
  function renderProductSale() {
    if (content === "productSale") {
      return (
        <div className="grid grid-cols-12 fade in">{fetchProductSale()}</div>
      );
    } else {
      <div className="grid grid-cols-12 fade"></div>;
    }
  }
  return (
    <>
      <div className="col-span-8 px-3">
        <div className="features__products">
          <ul className="title px-3">
            {activeProductall()}
            {activeProductNew()}
            {activeProductSale()}
          </ul>
          {renderProductAll()}
          {renderProductView()}
          {renderProductSale()}
        </div>
      </div>
    </>
  );
}
export default Home;
