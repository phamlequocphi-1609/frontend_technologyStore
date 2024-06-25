import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Api from "../../Api";
import AddCart from "./AddCart";
import { useDispatch } from "react-redux";
import { DeleteWishlist } from "../../action/wishlist";

function ProductWishlist() {
  const [data, setData] = useState([]);
  console.log(data);
  const dispatch = useDispatch();
  useEffect(() => {
    let getWishlistCart = JSON.parse(
      localStorage.getItem("WishlistCart") || "[]"
    );
    Api.get("/product/wishlist")
      .then((response) => {
        const productWishlist = response.data.data.filter((val) =>
          getWishlistCart.includes(val.id)
        );
        setData(productWishlist);
      })
      .catch((error) => console.log(error));
  }, []);
  const handleDelete = (id) => {
    let wishlistCart = JSON.parse(localStorage.getItem("WishlistCart")) || [];
    console.log(wishlistCart);
    if (wishlistCart.includes(id)) {
      wishlistCart = wishlistCart.filter((val) => val !== id);
      localStorage.setItem("WishlistCart", JSON.stringify(wishlistCart));
      setData((prev) => prev.filter((val) => val.id !== id));
      const action = DeleteWishlist(wishlistCart.length);
      dispatch(action);
    }
  };
  function renderData() {
    if (Object.keys(data).length > 0) {
      return data.map((value, key) => {
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
          <div key={key} className="md:col-span-6 lg:col-span-3 px-3">
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
                    <Link onClick={() => handleDelete(value.id)}>
                      <svg
                        className="heart"
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 512 512"
                      >
                        <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                      </svg>
                      Delete wishlist
                    </Link>
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
      });
    }
  }
  return (
    <div className="col-span-12">
      <div className="discount">
        <div className="grid grid-cols-12 pb-3">
          <ul className=" col-span-7 flex pb-3">
            <li className="">
              <Link to="/" className="text-[18px] font-medium  p-3">
                Home
              </Link>
            </li>
          </ul>
        </div>
        <div className="grid grid-cols-12 fade in">{renderData()}</div>
      </div>
    </div>
  );
}
export default ProductWishlist;
