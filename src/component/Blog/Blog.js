import { Link, json } from "react-router-dom";
import Api from "../../Api";
import { useEffect, useState } from "react";
import moment from "moment";

function Blog() {
  const [item, setItem] = useState("");
  const [newPost, setNewPost] = useState("");
  useEffect(() => {
    Api.get("/blog/list")
      .then((res) => {
        setItem(res.data.blog);
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    Api.get("/blog/new/post")
      .then((response) => {
        setNewPost(response.data.data);
      })
      .catch((error) => console.log(error));
  }, []);
  function fetchData() {
    if (Object.keys(item).length > 0) {
      return item.map((value, key) => {
        const imgArray = JSON.parse(item[key].image);
        const firstImg = imgArray[0];
        return (
          <div className="col-span-6 px-4 pb-[30px]">
            <a href="">
              <div className="blog__cover border-[1px] border-solid border-[#eee] shadow-md relative">
                <div className="blog__img">
                  <a>
                    <img
                      className="w-full h-72 object-cover"
                      src={
                        "http://localhost:8800/my-shop/public/upload/blog/" +
                        firstImg
                      }
                    />
                  </a>
                </div>
                <div className="blog__text p-4">
                  <h3 className="text-[16px] font-semibold text-[#1c1c1c]">
                    {value.title}
                  </h3>
                  <div className="h-[2px] block bg-black bg-opacity-10 max-w-[36px] my-2"></div>
                  <div className="blog__description">{value.description}</div>
                </div>
                <Link
                  to={"/blog/detail/" + value.id}
                  className="text-right block text-[16px] text-[#2e3192] px-2 py-1 font-[500]"
                >
                  Read more
                </Link>
                <div className="blog__date">
                  <span className="blog__day">
                    {moment(value.created_at).format("DD")}
                  </span>
                  <br></br>
                  <span className="blog__month">
                    {moment(value.created_at).format("MMMM")}
                  </span>
                </div>
              </div>
            </a>
          </div>
        );
      });
    }
  }

  function newPosts() {
    if (Object.keys(newPost).length > 0) {
      return newPost.map((val, key) => {
        const imgArray = JSON.parse(newPost[key].image);
        const firstImg = imgArray[0];
        return (
          <div className="grid grid-cols-12 new__blog__item">
            <Link className="col-span-4 pr-3" to={"/blog/detail/" + val.id}>
              <img
                src={
                  "http://localhost:8800/my-shop/public/upload/blog/" + firstImg
                }
              />
            </Link>
            <Link
              className="col-span-8  blog__item__content"
              to={"/blog/detail/" + val.id}
            >
              <p>{val.title}</p>
            </Link>
          </div>
        );
      });
    }
  }
  return (
    <div className="col-span-12">
      <h2 className=" blog__title text-center text-[18px] font-bold text-[#2e3192] uppercase relative mb-8">
        News
      </h2>
      <div className="grid grid-cols-12">
        <div className="col-span-9 pr-[20px]">
          <div className="grid grid-cols-12">{fetchData()}</div>
        </div>
        <div className="col-span-3 px-[30px] border-l border-l-[#ececec] border-solid">
          <h3 className="text-[18px] text-[#1c1c1c] uppercase font-medium">
            New Posts
          </h3>
          <div className="h-[2px] block bg-black bg-opacity-10 max-w-[36px] my-2"></div>
          {newPosts()}
        </div>
      </div>
    </div>
  );
}
export default Blog;
