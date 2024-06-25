import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Api from "../../Api";

function Categorytab() {
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  useEffect(() => {
    Api.get("/product")
      .then((response) => {
        setProduct(response.data.data);
      })
      .catch((error) => console.log(error));
    Api.get("/category-brand")
      .then((response) => {
        setCategory(response.data.category);
        setBrand(response.data.brand);
      })
      .catch((error) => console.log(error));
  }, []);

  function BrandFilter(idCategory) {
    const categoryProduct = product.filter(
      (value) => value.id_category === idCategory
    );
    const brandIds = [...new Set(categoryProduct.map((item) => item.id_brand))];
    const categoryBrands = brand.filter((val) => brandIds.includes(val.id));
    return categoryBrands;
  }

  function productdata(idCategory) {
    let categoryProduct = product.filter(
      (val) => val.id_category === idCategory
    );
    return categoryProduct.map((item, key) => {
      const imgArr = JSON.parse(item.image);
      const firstImg = imgArr[0];
      const currentPrice = item.price * (1 - item.sale / 100);
      let saleImg;
      let priceStatus;
      if (item.status === 1) {
        saleImg = (
          <img
            className="w-[60px] absolute top-1 left-1"
            src={require("../Layouts/img/Home/sale_icon.png")}
          />
        );
        priceStatus = (
          <div className="price__wrapper">
            <span className="price__old">
              {item.price.toLocaleString("vi-VN")}đ
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
              {item.price.toLocaleString("vi-VN")}đ
            </span>
          </div>
        );
      }

      return (
        <div className="md:col-span-6 lg:col-span-3" key={key}>
          <div className="product__img__wrapper mt-0 mb-0 relative">
            {saleImg}
            <div className="product__info product__info--category">
              <img
                src={
                  "http://localhost:8800/my-shop/public/upload/product/" +
                  item.id_user +
                  "/" +
                  firstImg
                }
                alt=""
              />
              <div className="product__content product__content__active">
                <p>{item.name}</p>
                {priceStatus}
                <button className="btn add__to__cart ml-[12px] mb-0">
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
            <div className="choose choose__active px-2">
              <ul className="nav__justified">
                <li>
                  <Link to="">
                    <svg
                      className="heart ml-[32px]"
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 512 512"
                    >
                      <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                    </svg>
                    Add to wishlist
                  </Link>
                </li>
                <li>
                  <Link to={"/product/detail/" + item.id} className="">
                    <img
                      className="product__detail ml-[32px]"
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
  function render() {
    if (category.length > 0) {
      return category.map((val, key) => {
        const categoryBrand = BrandFilter(val.id);
        let categoryImg;
        if (val.id === 1) {
          categoryImg = (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16"
              width="16"
              viewBox="0 0 512 512"
              className="mt-[10px] ml-[10px]  fill-[red]"
            >
              <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
            </svg>
          );
        } else if (val.id === 2) {
          categoryImg = (
            <svg
              className="mt-[10px] ml-[10px]  fill-[red]"
              height="16"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
            >
              <path d="M128 32C92.7 32 64 60.7 64 96V352h64V96H512V352h64V96c0-35.3-28.7-64-64-64H128zM19.2 384C8.6 384 0 392.6 0 403.2C0 445.6 34.4 480 76.8 480H563.2c42.4 0 76.8-34.4 76.8-76.8c0-10.6-8.6-19.2-19.2-19.2H19.2z" />
            </svg>
          );
        } else if (val.id === 3) {
          categoryImg = (
            <svg
              className="mt-[10px] ml-[10px]  fill-[red]"
              height="16"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H64zM176 432h96c8.8 0 16 7.2 16 16s-7.2 16-16 16H176c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
            </svg>
          );
        } else if (val.id === 5) {
          categoryImg = (
            <svg
              className="mt-[10px] ml-[10px]  fill-[red]"
              height="16"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              <path d="M253.3 35.1c6.1-11.8 1.5-26.3-10.2-32.4s-26.3-1.5-32.4 10.2L117.6 192H32c-17.7 0-32 14.3-32 32s14.3 32 32 32L83.9 463.5C91 492 116.6 512 146 512H430c29.4 0 55-20 62.1-48.5L544 256c17.7 0 32-14.3 32-32s-14.3-32-32-32H458.4L365.3 12.9C359.2 1.2 344.7-3.4 332.9 2.7s-16.3 20.6-10.2 32.4L404.3 192H171.7L253.3 35.1zM192 304v96c0 8.8-7.2 16-16 16s-16-7.2-16-16V304c0-8.8 7.2-16 16-16s16 7.2 16 16zm96-16c8.8 0 16 7.2 16 16v96c0 8.8-7.2 16-16 16s-16-7.2-16-16V304c0-8.8 7.2-16 16-16zm128 16v96c0 8.8-7.2 16-16 16s-16-7.2-16-16V304c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
            </svg>
          );
        }
        return (
          <div className="category__tab__product pb-[60px]" key={key}>
            <div className="category__container">
              <div className="header__product__box border-t-2 border-solid border-[#2e318d]">
                <div className="grid grid-cols-12">
                  <div className="col-span-4">
                    <div className="category__name">
                      <Link className="flex bg-[#2e3192] rounded-tr-[99px] rounded-br-[99px] w-[185px] relative">
                        <span className="text-[18px] font-semibold text-[#fff] py-[6px] px-[18px]">
                          {val.category}
                        </span>
                        <span className="w-[36px] h-[36px] bg-[#fff] rounded-[50%] absolute right-px top-[1px]">
                          {categoryImg}
                        </span>
                      </Link>
                    </div>
                  </div>

                  <div className="col-span-8">
                    <div className="title__content text-right pt-[8px] pr-[15px]">
                      <p className="title__box">
                        {categoryBrand.length > 0 &&
                          categoryBrand.map((val, key) => (
                            <span key={key}>
                              <Link>{val.brand}</Link>
                              {key < categoryBrand.length - 1 && " / "}
                            </span>
                          ))}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab__content">
                <div className="grid grid-cols-12">
                  <div className="col-span-4">
                    <Link>
                      <img
                        className="w-full"
                        src={
                          "http://localhost:8800/my-shop/public/upload/category/" +
                          val.image
                        }
                      />
                    </Link>
                  </div>
                  <div className="col-span-8">
                    <div className="grid grid-cols-12">
                      {productdata(val.id)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      });
    }
  }
  return <>{render()}</>;
}
export default Categorytab;
