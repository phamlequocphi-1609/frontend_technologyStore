import { Link, useLocation } from "react-router-dom";
import AddCart from "./AddCart";
import { useState } from "react";
import AddWishlist from "./AddWishlist";

function ProductPriceRange() {
  const location = useLocation();
  const data = location.state ? location.state.data : [];
  const [sortOrder, setSortOrder] = useState("default");
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
  function renderSearchData() {
    if (data.length > 0) {
      const sortData = sortProduct([...data]);
      return sortData.map((value, key) => {
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
          <div className="lg:col-span-3 pl-2 pr-2 md:col-span-4" key={key}>
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
                    <AddWishlist id={value.id} />
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
              <Link to="/" className="text-[18px] p-3">
                Home
              </Link>
              /
              <Link className="text-[18px] font-medium p-3">
                Products filtered by price range
              </Link>
            </li>
          </ul>
          <div className="col-span-5">
            <div className="grid grid-cols-12">
              <p className="col-span-6 text-[18px] p-2 text-center">
                View all {data.length} products
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
        <div className="grid grid-cols-12 fade in">{renderSearchData()}</div>
      </div>
    </div>
  );
}
export default ProductPriceRange;
