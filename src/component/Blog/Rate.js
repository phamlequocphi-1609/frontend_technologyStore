import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import Api from "../../Api";
function Rate(props) {
  const idBlog = props.idBlog;
  const [rating, setRating] = useState(0);
  const [error, setError] = useState("");
  const loggedUser = localStorage.getItem("Logged");
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const userData = JSON.parse(localStorage.getItem("appState"));
  const changeRating = (newRating, name) => {
    setRating(newRating);
    if (loggedUser) {
      setError("");
      let config = {
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      };
      const formData = new FormData();
      formData.append("id_user", userData.id);
      formData.append("id_blog", idBlog);
      formData.append("rate", newRating);
      Api.post("/blog/rate/" + idBlog, formData, config)
        .then((response) => {
          if (response.data.errors) {
            setError(response.data.errors);
          } else {
            console.log(response);
            Api.get("/rate/blog/" + idBlog)
              .then((res) => {
                console.log(res);
                const rateArray = [];
                const rating = res.data.data;
                for (const key in rating) {
                  if (rating.hasOwnProperty(key)) {
                    const rateValue = rating[key].rate;
                    rateArray.push(rateValue);
                  }
                }
                console.log(rateArray);
                const total = rateArray.reduce((sum, rate) => sum + rate);
                const average = total / rateArray.length;
                setRating(average);
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setError("Please log in !");
    }
  };
  useEffect(() => {
    Api.get("/rate/blog/" + idBlog)
      .then((res) => {
        console.log(res);
        const rateArray = [];
        const rating = res.data.data;
        for (const key in rating) {
          if (rating.hasOwnProperty(key)) {
            const rateValue = rating[key].rate;
            rateArray.push(rateValue);
          }
        }
        console.log(rateArray);
        const total = rateArray.reduce((sum, rate) => sum + rate);
        const average = total / rateArray.length;
        setRating(average);
      })
      .catch((error) => {
        console.log(error);
      });
  }, ["/rate/blog/" + idBlog]);
  return (
    <div className="rate__are mt-3">
      <p className="uppercase text-[12px] text-[#363432] font-[700] mr-1">
        Rate this item:
      </p>
      <p className="text-[red] font-bold">{error}</p>
      <StarRatings
        rating={rating}
        starRatedColor="blue"
        starHoverColor="blue"
        changeRating={changeRating}
        numberOfStars={5}
        name="rating"
        starDimension="20px"
        starSpacing="2px"
      />
    </div>
  );
}
export default Rate;
