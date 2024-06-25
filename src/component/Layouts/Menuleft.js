import { Link } from "react-router-dom";
import Brand from "../product/Brand";
import Category from "../product/Category";
import PriceRange from "../product/PriceRange";
import { useEffect, useState } from "react";
import Api from "../../Api";

function Menuleft() {
  const [newPost, setNewPost] = useState("");
  useEffect(() => {
    Api.get("/blog/new/post")
      .then((response) => {
        setNewPost(response.data.data);
      })
      .catch((error) => console.log(error));
  }, []);
  function renderNewsMain() {
    if (newPost.length > 0) {
      const image = JSON.parse(newPost[0].image);
      const firstImg = image[0];
      return (
        <div className="news__main hover:cursor-pointer">
          <Link to={"/blog/detail/" + newPost[0].id}>
            <img
              src={
                "http://localhost:8800/my-shop/public/upload/blog/" + firstImg
              }
              alt=""
            />
            <div className="new__text hover:cursor-pointer">
              <h3>{newPost[0].title}</h3>
            </div>
          </Link>
        </div>
      );
    }
  }
  function renderNewItem() {
    if (Object.keys(newPost).length > 0) {
      return newPost.slice(1).map((val, key) => {
        const imageArray = JSON.parse(val.image);
        const firstImg = imageArray[0];
        return (
          <Link href="" key={key} to={"/blog/detail/" + val.id}>
            <div className="items__content">
              <a href="">
                <img
                  src={
                    "http://localhost:8800/my-shop/public/upload/blog/" +
                    firstImg
                  }
                  alt=""
                />
              </a>
              <div className="content__text">
                <p>{val.title}</p>
              </div>
            </div>
          </Link>
        );
      });
    }
  }
  return (
    <div className="col-span-4 px-3 ">
      <div className="left__sidebar">
        <div className="features__news">
          <a className="news__heading uppercase" href>
            <svg
              className="news__icon"
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 512 512"
            >
              <path d="M96 96c0-35.3 28.7-64 64-64H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H80c-44.2 0-80-35.8-80-80V128c0-17.7 14.3-32 32-32s32 14.3 32 32V400c0 8.8 7.2 16 16 16s16-7.2 16-16V96zm64 24v80c0 13.3 10.7 24 24 24H296c13.3 0 24-10.7 24-24V120c0-13.3-10.7-24-24-24H184c-13.3 0-24 10.7-24 24zm208-8c0 8.8 7.2 16 16 16h48c8.8 0 16-7.2 16-16s-7.2-16-16-16H384c-8.8 0-16 7.2-16 16zm0 96c0 8.8 7.2 16 16 16h48c8.8 0 16-7.2 16-16s-7.2-16-16-16H384c-8.8 0-16 7.2-16 16zM160 304c0 8.8 7.2 16 16 16H432c8.8 0 16-7.2 16-16s-7.2-16-16-16H176c-8.8 0-16 7.2-16 16zm0 96c0 8.8 7.2 16 16 16H432c8.8 0 16-7.2 16-16s-7.2-16-16-16H176c-8.8 0-16 7.2-16 16z" />
            </svg>
            News
          </a>
          <div className="box__news">
            {renderNewsMain()}
            <div className="news__items">{renderNewItem()}</div>
            <div className="items__forward text-right mt-2.5 hover:cursor-pointer">
              <Link to="/blog">Read more &gt;&gt;</Link>
            </div>
          </div>
        </div>

        <Category />
        <Brand />
        <PriceRange />
        <div className="ship__img">
          <img src={require("./img/Home/ship_img.png")} alt="" />
          <img src={require("./img/Home/freeshio.png")} alt="" />
        </div>
      </div>
    </div>
  );
}
export default Menuleft;
