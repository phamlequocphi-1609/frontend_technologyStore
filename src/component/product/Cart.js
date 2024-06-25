import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Api from "../../Api";
import { DecreaseNewQty, DeleteNewQty, IncreaseNewQty } from "../../action/qty";
import { useDispatch } from "react-redux";
import {
  DecreaseNewPrice,
  DeleteNewPrice,
  IncreaseNewPrice,
} from "../../action/price";

function Cart() {
  const [data, setData] = useState([]);
  let cart = JSON.parse(localStorage.getItem("cart")) || {};
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    let cartQtyOnly = {};
    Object.keys(cart).forEach((key) => {
      cartQtyOnly[key] = cart[key].qty;
    });
    Api.post("/product/cart", cartQtyOnly)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => console.log(error));
  }, []);
  console.log(data);
  useEffect(() => {
    let totalProductPrice = 0;
    Object.keys(cart).map((key) => {
      totalProductPrice += cart[key].totalPrice;
    });
    setTotal(totalProductPrice);
  }, [cart]);
  function handleIncrease(idProduct) {
    if (cart.hasOwnProperty(idProduct)) {
      let productIncrease = cart[idProduct].qty;
      productIncrease++;
      cart[idProduct].qty = productIncrease;
      cart[idProduct].totalPrice = cart[idProduct].qty * cart[idProduct].price;
      localStorage.setItem("cart", JSON.stringify(cart));
      setData((prev) => {
        return prev.map((value) => {
          if (value.id === idProduct) {
            return { ...value, qty: value.qty + 1 };
          }
          return value;
        });
      });
      let totalqty = 0;
      let totalprice = 0;
      if (Object.keys(cart).length > 0) {
        Object.keys(cart).map((key) => {
          totalqty += cart[key].qty;
          totalprice = cart[key].totalPrice;
        });
        console.log(totalprice);
        const action = IncreaseNewQty(totalqty);
        dispatch(action);
        const action1 = IncreaseNewPrice(totalprice);
        dispatch(action1);
      }
    }
  }
  function handleDecrease(idProduct) {
    if (cart.hasOwnProperty(idProduct)) {
      let productDecrease = cart[idProduct].qty;
      productDecrease--;
      cart[idProduct].qty = productDecrease;
      cart[idProduct].totalPrice = cart[idProduct].qty * cart[idProduct].price;
      localStorage.setItem("cart", JSON.stringify(cart));
      setData((prev) => {
        return prev.map((value) => {
          if (value.id === idProduct) {
            return { ...value, qty: value.qty - 1 };
          }
          return value;
        });
      });
      let totalqty = 0;
      let totalprice = 0;
      if (Object.keys(cart).length > 0) {
        Object.keys(cart).map((key) => {
          totalqty += cart[key].qty;
          totalprice = cart[key].totalPrice;
        });
        const action = DecreaseNewQty(totalqty);
        dispatch(action);
        const action1 = DecreaseNewPrice(totalprice);
        dispatch(action1);
      }
    }
  }
  function handleDelete(idProduct) {
    if (cart.hasOwnProperty(idProduct)) {
      delete cart[idProduct];
      localStorage.setItem("cart", JSON.stringify(cart));
      setData((prev) => prev.filter((value) => value.id !== idProduct));
      let tongqty = 0;
      let tongprice = 0;
      Object.keys(cart).map((key) => {
        tongqty += cart[key].qty;
        tongprice = cart[key].totalPrice;
      });
      const action = DeleteNewQty(tongqty);
      dispatch(action);
      const action1 = DeleteNewPrice(tongprice);
      dispatch(action1);
    }
  }
  const navigate = useNavigate();
  function handleClickPay() {
    navigate("/pay", {
      state: { data, total },
    });
  }
  const renderCartData = () => {
    if (Object.keys(data).length > 0) {
      return data.map((value, key) => {
        const imgArr = JSON.parse(value.image);
        const firstImg = imgArr[0];
        const currentPrice = value.price * (1 - value.sale / 100);
        let priceStatus;
        let priceTotal;
        if (value.status === 1) {
          priceStatus = <span>{currentPrice.toLocaleString("vi-VN")}đ</span>;
          priceTotal = (
            <span>{(currentPrice * value.qty).toLocaleString("vi-VN")}đ</span>
          );
        } else {
          priceStatus = <span>{value.price.toLocaleString("vi-VN")}đ</span>;
          priceTotal = (
            <span>{(value.price * value.qty).toLocaleString("vi-VN")}đ</span>
          );
        }
        return (
          <tr key={key}>
            <td className="cart__img md:p-0 lg:px-[4px] lg:py-[15px]">
              <img
                src={
                  "http://localhost:8800/my-shop/public/upload/product/" +
                  value.id_user +
                  "/" +
                  firstImg
                }
              />
            </td>
            <td className="cart__name md:p-0 lg:px-[4px] lg:py-[15px]">
              <Link>{value.name}</Link>
            </td>
            <td className="cart__price md:p-0 lg:px-[4px] lg:py-[15px]">
              {priceStatus}
            </td>
            <td className="cart__quantity md:p-0 lg:px-[4px] lg:py-[15px]">
              <div className="cart__quantity__button">
                <Link
                  to=""
                  className="cart__quantity__up"
                  onClick={() => handleIncrease(value.id)}
                >
                  +
                </Link>
                <input
                  className="cart__quantity__input"
                  type="text"
                  name="quantity"
                  value={value.qty}
                  autocomplete="off"
                  size="2"
                />
                <Link
                  to=""
                  className="cart__quantity__down"
                  onClick={() => handleDecrease(value.id)}
                >
                  -
                </Link>
              </div>
            </td>
            <td className="cart__total md:p-0 lg:px-[4px] lg:py-[15px]">
              {priceTotal}
            </td>
            <td className="cart__delete md:p-0 lg:px-[4px] lg:py-[15px]">
              <Link to="" onClick={() => handleDelete(value.id)}>
                <img src={require("../Layouts/img/member/delete.png")} />
              </Link>
            </td>
          </tr>
        );
      });
    }
  };
  return (
    <div className="col-span-12">
      <div className="cart mt-[30px]">
        <div className="grid grid-cols-12">
          <div className="md:col-span-12 md:px-0 lg:col-span-8 lg:px-[20px] border-r-[1px] border-[#ececec]">
            <table className="cart__table">
              <thead>
                <tr>
                  <td>Item</td>
                  <td>Name</td>
                  <td>Price</td>
                  <td>Quantity</td>
                  <td>Total</td>
                </tr>
              </thead>
              <tbody>{renderCartData()}</tbody>
            </table>
          </div>
          <div className="md:col-span-12 lg:col-span-4 px-[20px]">
            <div className="cart__sidebar">
              <h2>Quantity Total</h2>
              <div className="total__body">
                <ul>
                  <li>
                    Total
                    <span>{total.toLocaleString("vi-VN")}đ</span>
                  </li>
                  <li>
                    Tax
                    <span>20.000đ</span>
                  </li>
                  <li>
                    Shipping Cost
                    <span>Free</span>
                  </li>
                  <li>
                    Total
                    <span>{(total + 20000).toLocaleString("vi-VN")}đ</span>
                  </li>
                </ul>
                <div className="cart__pay">
                  <p onClick={handleClickPay}>Pay</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Cart;
