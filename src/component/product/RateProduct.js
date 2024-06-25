import { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import Api from "../../Api";

function RateProduct(props) {
  const idproduct = props.idproduct;
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
      formData.append("id_product", idproduct);
      formData.append("rate", newRating);
      Api.post("/product/rate/" + idproduct, formData, config)
        .then((res) => {
          if (res.data.errors) {
            setError(res.data.errors);
          } else {
            console.log(res);
            Api.get("/rate/product/" + idproduct)
              .then((response) => {
                const rateArr = [];
                const rating = response.data.data;
                for (const key in rating) {
                  if (rating.hasOwnProperty(key)) {
                    const rateValue = rating[key].rate;
                    rateArr.push(rateValue);
                  }
                }

                const total = rateArr.reduce((sum, rate) => sum + rate);
                const average = total / rateArr.length;
                setRating(average);
              })
              .catch((error) => console.log(error));
          }
        })
        .catch((error) => console.log(error));
    } else {
      setError("Please log in !");
    }
  };
  useEffect(() => {
    Api.get("/rate/product/" + idproduct)
      .then((response) => {
        const rateArr = [];
        const rating = response.data.data;
        for (const key in rating) {
          if (rating.hasOwnProperty(key)) {
            const rateValue = rating[key].rate;
            rateArr.push(rateValue);
          }
        }

        const total = rateArr.reduce((sum, rate) => sum + rate);
        const average = total / rateArr.length;
        setRating(average);
      })
      .catch((error) => console.log(error));
  }, [idproduct]);
  return (
    <>
      <p className="text-[red] font-bold">{error}</p>
      <StarRatings
        rating={rating}
        starRatedColor="#fe980f"
        starHoverColor="#fe980f"
        changeRating={changeRating}
        numberOfStars={5}
        name="rating"
        starDimension="26px"
        starSpacing="4px"
      />
    </>
  );
}
export default RateProduct;
