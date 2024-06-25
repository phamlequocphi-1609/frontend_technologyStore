import { useEffect, useRef, useState } from "react";
import Api from "../../Api";

function CommentProduct(props) {
  const [commentdata, setCommentdata] = useState("");
  const [error, setError] = useState("");
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const userData = JSON.parse(localStorage.getItem("appState"));
  let { idproduct, idReply, getCmt } = props;
  let url = "/product/comment/" + idproduct;
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
  }, [idReply]);
  function handleComment(e) {
    setCommentdata(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    let success = true;
    if (commentdata === "") {
      setError("Please write a comment to post !");
      success = false;
    }
    if (!localStorage.getItem("Logged")) {
      setError("Please login to comment !");
      success = false;
    }
    if (success) {
      let config = {
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      };
      const formdata = new FormData();
      formdata.append("id_product", idproduct);
      formdata.append("id_user", userData.id);
      formdata.append("name_user", userData.name);
      formdata.append("id_comment", idReply ? idReply : 0);
      formdata.append("comment", commentdata);
      formdata.append("avatar_user", userData.avatar);
      Api.post(url, formdata, config)
        .then((response) => {
          if (response.data.errors) {
            setError(response.data.errors);
          } else {
            getCmt(response.data.data);
            setCommentdata("");
          }
        })
        .catch((error) => console.log(error));
    }
  }
  return (
    <div className="reply__box">
      <p className=" mb-3">
        <b>Write Your Review</b>
      </p>
      <p className="error__form ">{error}</p>
      <div className="text__are mb-5">
        <textarea
          ref={ref}
          name="message"
          rows="11"
          onChange={handleComment}
          value={commentdata}
        ></textarea>
        <button type="button" className="review__btn" onClick={handleSubmit}>
          Review
        </button>
      </div>
    </div>
  );
}
export default CommentProduct;
