import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Api from "../../Api";
function Myproduct() {
  const [data, setData] = useState([]);
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  let url = "/user/my-product";
  useEffect(() => {
    let config = {
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    };
    Api.get(url, config)
      .then((response) => {
        console.log(response);
        const products = Array.isArray(response.data.data)
          ? response.data.data
          : Object.values(response.data.data);
        setData(products);
      })
      .catch((error) => console.log(error));
  }, [url, accessToken]);

  function renderProduct() {
    if (data.length > 0) {
      return data.map((value, key) => {
        const imgArr = JSON.parse(value.image);
        const firstImg = imgArr[0];
        let priceSale;
        if (value.status === 1) {
          priceSale = value.price * (1 - value.sale / 100);
        } else {
          priceSale = value.price;
        }
        return (
          <tr key={key}>
            <td className="product__id lg:p-[30px] md:p-[3px]">
              <p>{value.id}</p>
            </td>
            <td className="product__name lg:p-[30px] md:p-[3px]">
              <h4>
                <Link>{value.name}</Link>
              </h4>
            </td>
            <td className="product__image lg:p-[30px] md:p-[3px]">
              <Link>
                <img
                  src={
                    "http://localhost:8800/my-shop/public/upload/product/" +
                    value.id_user +
                    "/" +
                    firstImg
                  }
                />
              </Link>
            </td>
            <td className="product__price lg:p-[30px] md:p-[3px]">
              <p>{priceSale.toLocaleString("vi-VN")}đ</p>
            </td>
            <td className="product__edit lg:p-[30px] md:p-[3px]">
              <Link to={"/product/edit/" + value.id}>
                <img src={require("../Layouts/img/member/edit.png")} />
              </Link>
            </td>
            <td className="product__delete lg:p-[30px] md:p-[3px]">
              <Link onClick={() => handleDelete(value.id)}>
                <img src={require("../Layouts/img/member/delete.png")} />
              </Link>
            </td>
          </tr>
        );
      });
    }
  }
  function handleDelete(idproduct) {
    let config = {
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    };
    Api.get("/user/product/delete/" + idproduct, config)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => console.log(error));
  }
  return (
    <div className="col-span-8">
      <div className="myProduct px-3">
        <h2 className=" account__title text-center text-[18px] font-bold text-[#2e3192] uppercase relative mb-3">
          My Product
        </h2>
        <table className="table__product">
          <thead>
            <tr className="product_menu">
              <td>ID</td>
              <td>Name</td>
              <td>Image</td>
              <td>Price</td>
              <td>Edit</td>
              <td>Delete</td>
            </tr>
          </thead>
          <tbody>{renderProduct()}</tbody>
        </table>
        <div className="text-right mt-7">
          <Link to="/product/add" className="add_product">
            Add product
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Myproduct;
