import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Api from "../../Api";
import AddCart from "./AddCart";

function ProductCategory() {
  const [smartphoneData, setSmartphoneData] = useState([]);
  const [laptopData, setLaptopData] = useState([]);
  const [tabletData, setTabletData] = useState([]);
  const [accessory, setAccessory] = useState([]);
  const [sortOrder, setSortOrder] = useState("default");
  let params = useParams();
  useEffect(() => {
    Api.get("/product")
      .then((response) => {
        console.log(response.data.data);
        setSmartphoneData(
          response.data.data.filter((item) => item.id_category === 1)
        );
        setLaptopData(
          response.data.data.filter((item) => item.id_category === 2)
        );
        setTabletData(
          response.data.data.filter((item) => item.id_category === 3)
        );
        setAccessory(
          response.data.data.filter((item) => item.id_category === 5)
        );
      })
      .catch((error) => console.log(error));
  }, []);
  function handleSortChange(e) {
    setSortOrder(e.target.value);
  }
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
  function renderSmartphoneProduct() {
    if (Object.keys(smartphoneData).length > 0) {
      const sortData = sortProduct([...smartphoneData]);
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
  function renderLaptopProduct() {
    if (Object.keys(laptopData).length > 0) {
      const sortData = sortProduct([...laptopData]);
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
  function renderTabletProduct() {
    if (Object.keys(tabletData).length > 0) {
      const sortData = sortProduct([...tabletData]);
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
  function renderAccessoryProduct() {
    if (Object.keys(accessory).length > 0) {
      const sortData = sortProduct([...accessory]);
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

  const renderdatafollowcategory = () => {
    if (params.category === "smartphone") {
      return renderSmartphoneProduct();
    } else if (params.category === "laptop") {
      return renderLaptopProduct();
    } else if (params.category === "tablet") {
      return renderTabletProduct();
    } else {
      return renderAccessoryProduct();
    }
  };
  return (
    <div className="col-span-12">
      <div className="discount">
        <div className="grid grid-cols-12 pb-3">
          <ul className=" col-span-7 flex pb-3">
            <li className="">
              <Link className="text-[18px] p-3">Home</Link>/
              <Link className="text-[18px] font-medium p-3">
                {params.category}
              </Link>
            </li>
          </ul>
          <div className="col-span-5">
            <div className="grid grid-cols-12">
              <p className="col-span-6 text-[18px] p-2 text-center">
                View all{" "}
                {params.category === "smartphone" && smartphoneData.length}{" "}
                {params.category === "laptop" && laptopData.length}{" "}
                {params.category === "tablet" && tabletData.length}{" "}
                {params.category === "accessory" && accessory.length} products
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
          {renderdatafollowcategory()}
        </div>
      </div>
    </div>
  );
}
export default ProductCategory;
