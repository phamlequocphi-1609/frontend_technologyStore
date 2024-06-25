import { useEffect, useState } from "react";
import { Link, json, useParams } from "react-router-dom";
import Api from "../../Api";
import Rate from "./Rate";
import Listcomment from "./Listcomment";
import Comment from "./Comment";

function Detail() {
  let params = useParams();
  const [data, setData] = useState("");
  const [newPostData, setNewPostData] = useState("");
  let idBlog = params.id;
  const [next, setNext] = useState();
  const [previous, setPrevious] = useState();
  const [commentReply, setCommentReply] = useState();
  const [listComment, setListComment] = useState([]);
  useEffect(() => {
    Api.get("/blog/detail/" + idBlog)
      .then((response) => {
        setData(response.data.data);
        setListComment(response.data.data.comment);
      })
      .catch((error) => console.log(error));
  }, [idBlog]);
  useEffect(() => {
    Api.get("/blog/new/post")
      .then((res) => {
        setNewPostData(res.data.data);
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    Api.get("/blog/detail-pagination/" + idBlog)
      .then((response) => {
        setNext(response.data.next);
        setPrevious(response.data.previous);
      })
      .catch((error) => console.log(error));
  }, [idBlog]);
  function fetchPageTitle() {
    if (data) {
      const imgArr = JSON.parse(data.image);
      const firstImg = imgArr[0];
      return (
        <div className="page__title relative">
          <div className="page__title__bg relative">
            <img
              className="w-full h-[300px] object-cover"
              src={
                "http://localhost:8800/my-shop/public/upload/blog/" + firstImg
              }
              alt="Background"
            />
            <div className="page__title__overlay absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50"></div>
          </div>
          <div className="page__title__text">
            <h1>{data.title}</h1>
          </div>
        </div>
      );
    }
  }

  function fetchContent() {
    if (data) {
      const imgArr = JSON.parse(data.image);
      const secondImg = imgArr[1];
      const thirdImg = imgArr[2];
      return (
        <div className="page__content relative p-[24px] border-[1px] border-[#ececec] border-solid">
          <p className="text-[#1c1c1c] text-[16px] font-semibold mb-[28px]">
            {data.description}
          </p>
          <p className="mb-[28px]">
            <img
              className="w-[100%]"
              src={
                "http://localhost:8800/my-shop/public/upload/blog/" + secondImg
              }
            />
          </p>
          <p className="mb-[28px]">{data.content}</p>
          <p className="mb-[28px]">
            <img
              className="w-[100%]"
              src={
                "http://localhost:8800/my-shop/public/upload/blog/" + thirdImg
              }
            />
          </p>

          <ul className="social__blog mt-[28px] flex items-center">
            <li className="bg-[#4769A5]">
              <Link>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="16"
                  width="10"
                  viewBox="0 0 320 512"
                >
                  <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
                </svg>
                <span>Facebook</span>
              </Link>
            </li>
            <li className="bg-[#65ccef]">
              <Link>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="16"
                  width="16"
                  viewBox="0 0 512 512"
                >
                  <path d="M459.4 151.7c.3 4.5 .3 9.1 .3 13.6 0 138.7-105.6 298.6-298.6 298.6-59.5 0-114.7-17.2-161.1-47.1 8.4 1 16.6 1.3 25.3 1.3 49.1 0 94.2-16.6 130.3-44.8-46.1-1-84.8-31.2-98.1-72.8 6.5 1 13 1.6 19.8 1.6 9.4 0 18.8-1.3 27.6-3.6-48.1-9.7-84.1-52-84.1-103v-1.3c14 7.8 30.2 12.7 47.4 13.3-28.3-18.8-46.8-51-46.8-87.4 0-19.5 5.2-37.4 14.3-53 51.7 63.7 129.3 105.3 216.4 109.8-1.6-7.8-2.6-15.9-2.6-24 0-57.8 46.8-104.9 104.9-104.9 30.2 0 57.5 12.7 76.7 33.1 23.7-4.5 46.5-13.3 66.6-25.3-7.8 24.4-24.4 44.8-46.1 57.8 21.1-2.3 41.6-8.1 60.4-16.2-14.3 20.8-32.2 39.3-52.6 54.3z" />
                </svg>
                <span>Twitter</span>
              </Link>
            </li>
            <li className="bg-[#ea4335]">
              <Link>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="16"
                  width="15.25"
                  viewBox="0 0 488 512"
                >
                  <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                </svg>
                <span>Google</span>
              </Link>
            </li>
            <li className="bg-[#2ba3e1]">
              <Link>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="16"
                  width="14"
                  viewBox="0 0 448 512"
                >
                  <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
                </svg>
                <span>Linkedln</span>
              </Link>
            </li>
          </ul>
          <Rate idBlog={idBlog} />
          <div className="page__area">
            <ul>
              <li>
                <Link
                  to={"/blog/detail-pagination/" + previous}
                  className="absolute right-[104px]  bottom-2 uppercase bg-[#F0F0E9] px-[12px] py-[4px] text-[#696763] text-[12px] font-[700] hover:bg-[#4769a5] hover:text-[#fff]"
                >
                  Previous
                </Link>
                <Link
                  to={"/blog/detail-pagination/" + next}
                  className="absolute right-[24px] bottom-2 uppercase bg-[#F0F0E9] px-[12px] py-[4px] text-[#696763] text-[12px] font-[700] hover:bg-[#4769a5] hover:text-[#fff]"
                >
                  Next
                </Link>
              </li>
            </ul>
          </div>
        </div>
      );
    }
  }
  function newPosts() {
    if (Object.keys(newPostData).length > 0) {
      return newPostData.map((val, key) => {
        const imgArray = JSON.parse(newPostData[key].image);
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
  function getCmt(newComment) {
    setListComment((prev) => [...prev, newComment]);
  }
  function handleReplyClick(newId) {
    setCommentReply(newId);
  }

  return (
    <div className="col-span-12">
      <h2 className="blog__title text-center text-[18px] font-bold text-[#2e3192] uppercase relative mb-8">
        Latest from our blog
      </h2>
      {fetchPageTitle()}
      <div className="page__cover py-[30px] ">
        <div className="grid grid-cols-12">
          <div className="max-sm:col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-9 px-[30px] ">
            {fetchContent()}
            <Listcomment
              listComment={listComment}
              handleReplyClick={handleReplyClick}
              idReply={commentReply}
            />
            <Comment idBlog={idBlog} getCmt={getCmt} idReply={commentReply} />
          </div>
          <div className="max-sm:col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-3 px-[30px] border-l border-l-[#ececec] border-solid">
            <h3 className="text-[18px] text-[#1c1c1c] uppercase font-medium">
              New Posts
            </h3>
            <div className="h-[2px] block bg-black bg-opacity-10 max-w-[36px] my-2"></div>
            {newPosts()}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Detail;
