import moment from "moment";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function Listcomment(props) {
  const { handleReplyClick, listComment } = props;
  const topRef = useRef(null);

  const handleReply = (e) => {
    handleReplyClick(e.target.id);
  };

  useEffect(() => {
    if (topRef.current && listComment.length > 0) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [listComment]);

  const getReplyForComment = (idComment, commentList) => {
    return commentList.filter((val) => parseInt(val.id_comment) === idComment);
  };

  const fetchData = (item, index = 0) => {
    const reply = getReplyForComment(item.id, listComment);
    return (
      <li
        className={`media inline-block ${index === 0 ? "" : "second__media"}`}
        key={item.id}
      >
        <Link to="#">
          <img
            className="w-[100px]"
            src={`http://localhost:8800/my-shop/public/upload/api/member/${item.avatar_user}`}
            alt="User Avatar"
          />
        </Link>
        <div className="media__body">
          <ul className="user__posted">
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16"
                width="14"
                viewBox="0 0 448 512"
              >
                <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
              </svg>
              {item.name_user}
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16"
                width="16"
                viewBox="0 0 512 512"
              >
                <path d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
              </svg>
              {moment(item.created_at).format("h:mm A")}
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16"
                width="14"
                viewBox="0 0 448 512"
              >
                <path d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16z" />
              </svg>
              {moment(item.updated_at).format("MMM D, YYYY")}
            </li>
          </ul>
          <p>{item.comment}</p>
          <Link id={item.id} onClick={handleReply}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16"
              width="16"
              viewBox="0 0 512 512"
            >
              <path d="M205 34.8c11.5 5.1 19 16.6 19 29.2v64H336c97.2 0 176 78.8 176 176c0 113.3-81.5 163.9-100.2 174.1c-2.5 1.4-5.3 1.9-8.1 1.9c-10.9 0-19.7-8.9-19.7-19.7c0-7.5 4.3-14.4 9.8-19.5c9.4-8.8 22.2-26.4 22.2-56.7c0-53-43-96-96-96H224v64c0 12.6-7.4 24.1-19 29.2s-25 3-34.4-5.4l-160-144C3.9 225.7 0 217.1 0 208s3.9-17.7 10.6-23.8l160-144c9.4-8.5 22.9-10.6 34.4-5.4z" />
            </svg>
            Reply
          </Link>
        </div>
        {reply.map((reply) => fetchData(reply, index + 1))}
      </li>
    );
  };

  return (
    <div className="page__comment mt-5">
      <h2
        ref={topRef}
        className="text-[20px] text-[363432] font-[700] uppercase mb-3"
      >
        {listComment.length} Responses
      </h2>
      <ul className="media__list">
        {listComment &&
          listComment
            .filter((item) => parseInt(item.id_comment) === 0)
            .map((val) => fetchData(val))}
      </ul>
    </div>
  );
}

export default Listcomment;
