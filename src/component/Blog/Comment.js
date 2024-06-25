import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Api from "../../Api";
function Comment(props) {
  const [commentdata, setCommentdata] = useState("");
  const [error, setError] = useState("");
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const userData = JSON.parse(localStorage.getItem("appState"));
  let { idBlog, idReply, getCmt } = props;
  let url = "/blog/comment/" + idBlog;
  const ref = useRef(null);
  useEffect(() => {
    if (idReply) {
      ref.current.focus();
      const Totop = ref.current.getBoundingClientRect();
      ref.current.scrollTo({
        top: Totop,
        behavior: "smooth",
      });
    }
  });
  const handleComment = (e) => {
    setCommentdata(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let check = true;
    if (commentdata === "") {
      setError("Please write a comment to post !");
      check = false;
    }
    if (!localStorage.getItem("Logged")) {
      setError("Please login to comment !");
      check = false;
    }
    if (check) {
      setError("");
      let config = {
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      };
      const formdata = new FormData();
      formdata.append("id_blog", idBlog);
      formdata.append("id_user", userData.id);
      formdata.append("name_user", userData.name);
      formdata.append("id_comment", idReply ? idReply : 0);
      formdata.append("comment", commentdata);
      formdata.append("avatar_user", userData.avatar);
      Api.post(url, formdata, config)
        .then((res) => {
          if (res.data.errors) {
            setError(res.data.errors);
          } else {
            getCmt(res.data.data);
            setCommentdata("");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <div className="reply__box mb-[100px] mt-[55px]">
      <h2 className="text-[20px] text-[363432] font-[700] uppercase mb-3">
        Comment
      </h2>
      <p className="error__form ">{error}</p>
      <div className="text__area">
        <textarea
          name="message"
          ref={ref}
          rows="11"
          onChange={handleComment}
          value={commentdata}
        ></textarea>
        <button type="submit" onClick={handleSubmit}>
          Response
        </button>
      </div>
    </div>
  );
}
export default Comment;
