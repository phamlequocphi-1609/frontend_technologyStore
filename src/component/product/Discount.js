import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Api from "../../Api";

function Discount() {
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectCategory, setSelectCategory] = useState(1);
  useEffect(() => {
    Api.get("/product")
      .then((response) => {
        setProduct(response.data.data.filter((item) => item.status === 1));
      })
      .catch((error) => console.log(error));
    Api.get("/category-brand")
      .then((response) => {
        setCategory(response.data.category);
      })
      .catch((error) => console.log(error));
  }, []);
  function handleClickCategory(id) {
    setSelectCategory(id);
  }
  const renderCategory = () => {
    if (Object.keys(category).length > 0) {
      return category.map((value, key) => {
        return (
          <li
            key={key}
            className={
              selectCategory === value.id ? "nav__discount__radius" : ""
            }
            onClick={() => handleClickCategory(value.id)}
          >
            <Link>{value.category}</Link>
          </li>
        );
      });
    }
  };
  function renderProduct() {
    if (Object.keys(product).length > 0) {
      return product.map((value, key) => {
        const imgArr = JSON.parse(value.image);
        const firstImg = imgArr[0];
        const currentPrice = value.price * (1 - value.sale / 100);
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
        } else {
          saleImg = null;
          priceStatus = (
            <div className="price__wrapper">
              <span className="price__current">
                {value.price.toLocaleString("vi-VN")}đ
              </span>
            </div>
          );
        }
        if (value.id_category === selectCategory) {
          return (
            <div className="col-span-3" key={key}>
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
                    <button className="btn add__to__cart">
                      <svg
                        className="cart__icon"
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 576 512"
                      >
                        <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
                      </svg>
                      Add to cart
                    </button>
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
                      <Link to={"/product/detail/" + value.id}>
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
        }
      });
    }
  }
  return (
    <div className="col-span-12">
      <div className="discount">
        <ul className="flex nax__discount pb-3">{renderCategory()}</ul>
        <div className="grid grid-cols-12 fade in">{renderProduct()}</div>
      </div>
    </div>
  );
}
export default Discount;
