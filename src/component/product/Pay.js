import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Api from "../../Api";

function Pay() {
  const location = useLocation();
  const data = location.state ? location.state.data : [];
  const total = location.state ? location.state.total : [];
  const [countrydata, setCountrydata] = useState([]);
  const [input, setInput] = useState({
    name: "",
    company: "",
    country: "",
    address: "",
    provincecity: "",
    phone: "",
    email: "",
    note: "",
  });
  const [nameError, setNameError] = useState("");
  const [companyError, setCompanyError] = useState("");
  const [countryError, setCountryError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [provincecityError, setProvincecityError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [noteError, setNoteError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    Api.get("/country")
      .then((response) => {
        setCountrydata(response.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  function renderCountry() {
    if (countrydata.length > 0) {
      return countrydata.map((value, key) => {
        return (
          <option key={key} id={value.id}>
            {value.name}
          </option>
        );
      });
    }
  }
  function renderData() {
    if (data.length > 0) {
      return data.map((value, key) => {
        let priceStatus;
        const currentPrice = value.price * (1 - value.sale / 100);
        if (value.status === 1) {
          priceStatus = (
            <span className="col-span-1">
              {currentPrice.toLocaleString("vi-VN")}đ
            </span>
          );
        } else {
          priceStatus = (
            <span className="col-span-1">
              {value.price.toLocaleString("vi-VN")}đ
            </span>
          );
        }
        return (
          <li key={key} className="grid grid-cols-12">
            <p className="col-span-9">
              {value.name} × {value.qty}
            </p>
            <p className="col-span-1"></p>
            {priceStatus}
          </li>
        );
      });
    }
  }
  const handleInput = (e) => {
    const nameInput = e.target.name;
    const value = e.target.value;
    setInput((prev) => ({ ...prev, [nameInput]: value }));
  };
  function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }
  function handleSubmit(e) {
    e.preventDefault();
    let isCheck = true;
    if (input.name === "") {
      setNameError("This is required");
      isCheck = false;
    } else {
      setNameError("");
    }
    if (input.company === "") {
      setCompanyError("This is required");
      isCheck = false;
    } else {
      setCompanyError("");
    }
    if (input.country === "") {
      setCountryError("This is required");
      isCheck = false;
    } else {
      setCountryError("");
    }
    if (input.address === "") {
      setAddressError("This is required");
      isCheck = false;
    } else {
      setAddressError("");
    }
    if (input.provincecity === "") {
      setProvincecityError("This is required");
      isCheck = false;
    } else {
      setProvincecityError("");
    }
    if (input.phone === "") {
      setPhoneError("This is required");
      isCheck = false;
    } else {
      setPhoneError("");
    }
    if (input.email === "") {
      setEmailError("This is required");
      isCheck = false;
    } else if (!validateEmail(input.email)) {
      setEmailError("Email format is invalid");
      isCheck = false;
    } else {
      setEmailError("");
    }
    if (input.note === "") {
      setNoteError("This is required");
      isCheck = false;
    } else {
      setNoteError("");
    }
    if (isCheck) {
      Api.post("/sendmail", {
        name: input.name,
        company: input.company,
        country: input.country,
        address: input.address,
        provincecity: input.provincecity,
        phone: input.phone,
        email: input.email,
        note: input.note,
        cart: data,
        total: total,
      })
        .then((response) => {
          console.log(response);
          const orderCode = response.data.orderCode;
          const orderdate = response.data.orderdate;
          navigate(`/order/received/${orderCode}/${orderdate}`, {
            state: { total },
          });
        })
        .catch((error) => console.log(error));
    }
  }
  return (
    <div className="col-span-12">
      <div className="pay">
        <form
          className="form__pay"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="grid grid-cols-12">
            <div className="md:col-span-12 lg:col-span-7 px-[15px]">
              <div className="pay__infor">
                <h2 className="uppercase text-[20px] font-semibold pt-[10px] mb-[10px]">
                  Invoice Information
                </h2>
                <p className="form__row form__row__wide mr-[56px]">
                  <label>Full Name</label>
                  <input name="name" type="text" onChange={handleInput} />
                  <p className="error__form">{nameError}</p>
                </p>
                <p className="form__row form__row__wide">
                  <label>Company name</label>
                  <input name="company" type="text" onChange={handleInput} />
                  <p className="error__form">{companyError}</p>
                </p>
                <p className="form__row form__row__wide">
                  <label>Country</label>
                  <select name="country" onChange={handleInput}>
                    <option>Select country</option>
                    {renderCountry()}
                  </select>
                  <p className="error__form">{countryError}</p>
                </p>
                <p className="form__row form__row__wide">
                  <label>Address</label>
                  <input
                    name="address"
                    type="text"
                    placeholder="House number or street name"
                    onChange={handleInput}
                  />
                  <p className="error__form">{addressError}</p>
                </p>
                <p className="form__row form__row__wide">
                  <label>Province / City</label>
                  <input
                    name="provincecity"
                    onChange={handleInput}
                    type="text"
                  />
                  <p className="error__form">{provincecityError}</p>
                </p>
                <p className="form__row mr-[56px]">
                  <label>Phone</label>
                  <input name="phone" onChange={handleInput} type="text" />
                  <p className="error__form">{phoneError}</p>
                </p>
                <p className="form__row">
                  <label>Email</label>
                  <input name="email" onChange={handleInput} type="email" />
                  <p className="error__form">{emailError}</p>
                </p>
                <p className="form__row form__row__wide">
                  <label>Order Note</label>
                  <textarea name="note" onChange={handleInput}></textarea>
                  <p className="error__form">{noteError}</p>
                </p>
              </div>
            </div>
            <div className="md:col-span-12 lg:col-span-5 px-[15px]">
              <div className="has__order">
                <div className="order__info">
                  <h3>Your Order</h3>
                  <div className="order__detail">
                    <div className="detail__table">
                      <ul>
                        <li>
                          Product
                          <span>Total</span>
                        </li>
                        {renderData()}
                        <li>
                          Total
                          <span>{total.toLocaleString("vi-VN")}đ</span>
                        </li>
                        <li>
                          Shipping Cost
                          <span>Free</span>
                        </li>
                        <li>
                          Tax
                          <span>20.000đ</span>
                        </li>
                        <li>
                          Total
                          <span>
                            {(total + 20000).toLocaleString("vi-VN")}đ
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className="payment">
                      <span>Payment check</span>
                      <p>
                        Please send your check to store name, store street,
                        store town.
                      </p>
                      <div className="order__pay">
                        <button type="submit">Order</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Pay;
