import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import { useEffect, useState } from "react";
import Api from "../../Api";
import RateProduct from "./RateProduct";
import ListcommentProduct from "./ListcommentProduct";
import CommentProduct from "./CommentProduct";
import AddCart from "./AddCart";
function Productdetail() {
  let params = useParams();
  const [data, setData] = useState([]);
  const [Productimg, setProductImg] = useState([]);
  const [productRecommend, setProductRecommend] = useState([]);
  const [detail, setDetail] = useState([]);
  const [description, setDescription] = useState([]);
  const [commentReply, setCommentReply] = useState();
  const [listComment, setListComment] = useState([]);
  const [showlargeImg, setShowLargeImg] = useState("");
  useEffect(() => {
    Api.get("/product/detail/" + params.id)
      .then((response) => {
        setData(response.data.data);
        setProductImg(JSON.parse(response.data.data.image));
        setDetail(response.data.data.detail.split("\r\n"));
        setDescription(response.data.data.description.split(/\r?\n/));
        setListComment(response.data.data.comment_product);
      })
      .catch((error) => console.log(error));
  }, [params.id]);
  useEffect(() => {
    Api.get("/product/recommend")
      .then((response) => {
        setProductRecommend(response.data.data);
      })
      .catch((error) => console.log(error));
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    speed: 3000,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  const recommend = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  function handleImgMouseEnter(img) {
    setShowLargeImg(img);
  }
  function renderproductImg() {
    return (
      <Slider {...settings}>
        {Productimg.map((val, key) => (
          <div key={key} className="mt-4">
            <Link>
              <img
                src={
                  "http://localhost:8800/my-shop/public/upload/product/" +
                  data.id_user +
                  "/" +
                  val
                }
                onMouseEnter={() => handleImgMouseEnter(val)}
                style={{
                  border: showlargeImg === val ? "2px solid #2e31a0" : "none",
                }}
              />
            </Link>
          </div>
        ))}
      </Slider>
    );
  }
  function fetchProductRecommend() {
    if (Object.keys(productRecommend).length > 0) {
      return productRecommend.map((value, key) => {
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
        return (
          <div key={key} className="md:col-span-4 lg:col-span-3 px-3">
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
            </div>
          </div>
        );
      });
    }
  }
  function renderRecommendedItems() {
    return (
      <Slider {...recommend} className="col-span-12">
        {fetchProductRecommend()}
      </Slider>
    );
  }
  console.log(data);
  function renderProductDetail() {
    if (Object.keys(data).length > 0) {
      const imgArr = JSON.parse(data.image);
      const firstImg = imgArr[0];
      const currentPrice = data.price * (1 - data.sale / 100);
      let saleImg;
      let priceStatus;
      let addcart;
      if (data.status === 1) {
        saleImg = (
          <img
            className="w-[60px] absolute top-1 left-1"
            src={require("../Layouts/img/Home/sale_icon.png")}
          />
        );
        priceStatus = (
          <p className="product__price mt-5">
            <span className="price__now">
              {currentPrice.toLocaleString("vi-VN")}đ
            </span>
            <span className="price__before line-through">
              {" "}
              {data.price.toLocaleString("vi-VN")}đ
            </span>
          </p>
        );
        addcart = <AddCart id={data.id} price={currentPrice} />;
      } else {
        saleImg = null;
        priceStatus = (
          <p className="product__price mt-5">
            <span className="price__before no-underline">
              {" "}
              {data.price.toLocaleString("vi-VN")}đ
            </span>
          </p>
        );
        addcart = <AddCart id={data.id} price={data.price} />;
      }

      const changeImg = showlargeImg
        ? "http://localhost:8800/my-shop/public/upload/product/" +
          data.id_user +
          "/" +
          showlargeImg
        : "http://localhost:8800/my-shop/public/upload/product/" +
          data.id_user +
          "/" +
          firstImg;
      return (
        <>
          <div className="productInformation__header">
            <div className="grid grid-cols-12">
              <div className="col-span-5 px-3">
                <div className="product__view">
                  <img src={changeImg} />
                </div>
                <div className="product__slide mt-3">
                  <div className="carousel-inner">
                    <div className="product__detail__item relative">
                      {renderproductImg()}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-7 px-3">
                <div className="product__information">
                  {saleImg}
                  <div className="information__contain">
                    <h2 className=" text-[#363432] text-[28px] font-medium mb-3">
                      {data.name}
                    </h2>
                    <RateProduct idproduct={params.id} />
                    {priceStatus}
                    <p className="text-[#363432] text-[20px] font-medium mb-3">
                      Salient features
                    </p>
                    <ul>
                      {detail.length > 0 &&
                        detail.map((value, index) => {
                          return <li key={index}>{value}</li>;
                        })}
                    </ul>
                    <span className="inline-block w-full">
                      {addcart}
                      <span className="product__qty float-right">
                        <label>Quantity:</label>
                        <input type="text" value="1" />
                      </span>
                    </span>
                    <span className="social__icons">
                      <Link>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="16"
                          width="10"
                          viewBox="0 0 320 512"
                        >
                          <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
                        </svg>
                      </Link>
                      <Link>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="16"
                          width="16"
                          viewBox="0 0 512 512"
                        >
                          <path d="M459.4 151.7c.3 4.5 .3 9.1 .3 13.6 0 138.7-105.6 298.6-298.6 298.6-59.5 0-114.7-17.2-161.1-47.1 8.4 1 16.6 1.3 25.3 1.3 49.1 0 94.2-16.6 130.3-44.8-46.1-1-84.8-31.2-98.1-72.8 6.5 1 13 1.6 19.8 1.6 9.4 0 18.8-1.3 27.6-3.6-48.1-9.7-84.1-52-84.1-103v-1.3c14 7.8 30.2 12.7 47.4 13.3-28.3-18.8-46.8-51-46.8-87.4 0-19.5 5.2-37.4 14.3-53 51.7 63.7 129.3 105.3 216.4 109.8-1.6-7.8-2.6-15.9-2.6-24 0-57.8 46.8-104.9 104.9-104.9 30.2 0 57.5 12.7 76.7 33.1 23.7-4.5 46.5-13.3 66.6-25.3-7.8 24.4-24.4 44.8-46.1 57.8 21.1-2.3 41.6-8.1 60.4-16.2-14.3 20.8-32.2 39.3-52.6 54.3z" />
                        </svg>
                      </Link>
                      <Link>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="16"
                          width="16"
                          viewBox="0 0 512 512"
                        >
                          <path d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z" />
                        </svg>
                      </Link>
                      <Link>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="16"
                          width="14"
                          viewBox="0 0 448 512"
                        >
                          <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
                        </svg>
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="items__description pt-8">
            <h2 className="product__detail__title text-center text-[18px] font-bold text-[#2e3192] uppercase relative mb-8">
              Product Description
            </h2>
            <div className="description__box max-w-[800px] mx-auto px-3">
              <p>
                <img
                  className="mx-auto mb-6"
                  src={
                    "http://localhost:8800/my-shop/public/upload/product/" +
                    data.id_user +
                    "/" +
                    imgArr[3]
                  }
                  alt=""
                />
              </p>
              {description.length > 0 &&
                description.map((item, index) => {
                  if (
                    index === 0 ||
                    index === 3 ||
                    index === 6 ||
                    index === 9 ||
                    index === 12
                  ) {
                    return (
                      <>
                        <p className="text-[#1c1c1c] font-medium mb-4">
                          {item}
                        </p>
                      </>
                    );
                  } else {
                    return (
                      <>
                        <p className="mb-4 leading-7">{item}</p>
                      </>
                    );
                  }
                })}
              <p>
                <img
                  className="mx-auto mb-6"
                  src={
                    "http://localhost:8800/my-shop/public/upload/product/" +
                    data.id_user +
                    "/" +
                    imgArr[4]
                  }
                  alt=""
                />
              </p>
              <p>
                <img
                  className="mx-auto mb-6"
                  src={
                    "http://localhost:8800/my-shop/public/upload/product/" +
                    data.id_user +
                    "/" +
                    imgArr[5]
                  }
                  alt=""
                />
              </p>
            </div>
          </div>
        </>
      );
    }
  }
  function getCmt(newComment) {
    setListComment((prev) => [...prev, newComment]);
  }
  function handleReplyClick(newId) {
    setCommentReply(newId);
  }
  return (
    <div className="col-span-12">
      <h2 className=" product__detail__title text-center text-[18px] font-bold text-[#2e3192] uppercase relative mb-8">
        Product Information
      </h2>
      {renderProductDetail()}
      <div className="product__comment">
        <h2 className=" product__detail__title text-center text-[18px] font-bold text-[#2e3192] uppercase relative mb-8">
          Reviews
        </h2>
        <div className="max-w-[800px] mx-auto px-3" id="reviews">
          <ListcommentProduct
            listComment={listComment}
            handleReplyClick={handleReplyClick}
            idReply={commentReply}
          />
          <CommentProduct
            idproduct={params.id}
            getCmt={getCmt}
            idReply={commentReply}
          />
        </div>
      </div>
      <div className="product__recommend pt-8 relative ">
        <h2 className="product__detail__title text-center text-[18px] font-bold text-[#2e3192] uppercase relative mb-8">
          Recommended items
        </h2>
        <div className="recommend__cover max-w-[1000px] mx-auto px-3">
          <div className="grid grid-cols-12 fade in">
            {renderRecommendedItems()}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Productdetail;
