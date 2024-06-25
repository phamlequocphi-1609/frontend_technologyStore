import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Api from "../../Api";

function Account() {
  const [input, setInput] = useState({
    name: "",
    email: "",
    pass: "",
    phone: "",
    address: "",
    avatar: "",
    id_country: "",
  });
  const fileType = ["png", "jpg", "jpeg", "PNG", "JPG"];
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [avatarError, setAvatarError] = useState("");
  const [file, setFile] = useState("");
  const [country, setCountry] = useState([]);
  const [idUser, setIduser] = useState("");
  const [avatar, setAvatar] = useState("");
  let accessToken = JSON.parse(localStorage.getItem("accessToken"));
  useEffect(() => {
    Api.get("/country")
      .then((response) => {
        setCountry(response.data.data);
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    let userData = localStorage.getItem("appState");
    if (userData) {
      userData = JSON.parse(userData);
      setIduser(userData.id);
      setInput({
        name: userData.name,
        email: userData.email,
        address: userData.address,
        phone: userData.phone,
        id_country: userData.country,
        avatar: userData.avatar,
      });
    }
  }, []);
  console.log(input.avatar);
  function handleUserAvatarFile(e) {
    const files = e.target.files;
    setFile(files);
    if (files && files.length > 0) {
      let render = new FileReader();
      render.onload = (e) => {
        setAvatar(e.target.result);
      };
      render.readAsDataURL(files[0]);
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
    if (input.email === "") {
      setEmailError("This is required");
      isCheck = false;
    } else if (!validateEmail(input.email)) {
      setEmailError("Email format is invalid");
      isCheck = false;
    } else {
      setEmailError("");
    }
    if (input.pass === "") {
      setPassError("This is required");
      isCheck = false;
    } else {
      setPassError("");
    }
    if (input.phone === "") {
      setPhoneError("This is required");
      isCheck = false;
    } else {
      setPhoneError("");
    }
    if (input.address === "") {
      setAddressError("This is required");
      isCheck = false;
    } else {
      setAddressError("");
    }
    if (file) {
      if (file[0].size > 1024 * 1024) {
        setAvatarError("This required file size is less than 1 MB");
        isCheck = false;
      } else if (!fileType.includes(file[0].name.split(".").pop())) {
        setAvatarError(
          "Image file extensions are required: png, jpg, jpeg, PNG, JPG"
        );
        isCheck = false;
      }
    }
    if (isCheck) {
      let url = "/user/update/" + idUser;
      let config = {
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      };
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("email", input.email);
      formData.append("password", input.pass);
      formData.append("phone", input.phone);
      formData.append("address", input.address);
      formData.append("avatar", avatar);
      formData.append("country", input.id_country);
      Api.post(url, formData, config)
        .then((response) => {
          if (response.data.errors) {
            console.log(response.data.errors);
          } else {
            console.log(response);
            localStorage.setItem(
              "appState",
              JSON.stringify(response.data.Auth)
            );
            localStorage.setItem(
              "accessToken",
              JSON.stringify(response.data.token)
            );
          }
        })
        .catch((error) => console.log(error));
    }
  }
  return (
    <div className="col-span-8">
      <div className="account">
        <h2 className=" account__title text-center text-[18px] font-bold text-[#2e3192] uppercase relative">
          User Update
        </h2>
        <div className="grid grid-cols-12">
          <div className="col-span-4 px-4">
            <div className="card">
              <div className="card__body">
                <center>
                  <img
                    width="150"
                    src={
                      "http://localhost:8800/my-shop/public/upload/api/member/" +
                      input.avatar
                    }
                  />
                  <h4 className="my-3 text-[20px] font-bold text-[#555454]">
                    {input.name}
                  </h4>
                </center>
              </div>
            </div>
            <div>
              <hr className="my-[20px]"></hr>
            </div>
            <div className="card__body">
              <small className="text-[#999]">Email address</small>
              <h6 className="text-[12px] my-3 text-inherit font-medium">
                {input.email}
              </h6>
              <small className="text-[#999]">Phone</small>
              <h6 className="text-[12px] my-3 text-inherit font-medium">
                {input.phone}
              </h6>
              <small className="text-[#999]">Address</small>
              <h6 className="text-[12px] my-3 text-inherit font-medium">
                {input.address}
              </h6>
            </div>
          </div>
          <div className="col-span-8 px-3">
            <div className="card">
              <div className="card__body relative">
                <form onSubmit={handleSubmit}>
                  <div className="form__group">
                    <label className="col-span-12">Full name</label>
                    <div className="col-span-12">
                      <input
                        type="text"
                        name="name"
                        value={input.name}
                        onChange={handleInput}
                      />
                    </div>
                    <p className="error__form">{nameError}</p>
                  </div>
                  <div className="form__group">
                    <label className="col-span-12">Email</label>
                    <div className="col-span-12">
                      <input
                        type="email"
                        value={input.email}
                        name="email"
                        onChange={handleInput}
                      />
                    </div>
                    <p className="error__form">{emailError}</p>
                  </div>
                  <div className="form__group">
                    <label className="col-span-12">Password</label>
                    <div className="col-span-12">
                      <input
                        type="password"
                        name="pass"
                        onChange={handleInput}
                        value={input.pass}
                      />
                    </div>
                    <p className="error__form">{passError}</p>
                  </div>
                  <div className="form__group">
                    <label className="col-span-12">Phone</label>
                    <div className="col-span-12">
                      <input
                        type="text"
                        value={input.phone}
                        name="phone"
                        onChange={handleInput}
                      />
                    </div>
                    <p className="error__form">{phoneError}</p>
                  </div>
                  <div className="form__group">
                    <label className="col-span-12">Address</label>
                    <div className="col-span-12">
                      <input
                        type="text"
                        value={input.address}
                        name="address"
                        onChange={handleInput}
                      />
                    </div>
                    <p className="error__form">{addressError}</p>
                  </div>
                  <div className="form__group">
                    <label className="col-span-12">Update avatar</label>
                    <div className="col-span-12">
                      <input
                        type="file"
                        name="avatar"
                        onChange={handleUserAvatarFile}
                      />
                    </div>
                    <p className="error__form">{avatarError}</p>
                  </div>
                  <div className="form__group">
                    <label className="col-span-12">Select Country</label>
                    <div className="col-span-12">
                      <select name="id_country" onChange={handleInput}>
                        {country.length > 0 &&
                          country.map((value, key) => {
                            return (
                              <option
                                key={key}
                                value={value.id}
                                selected={input.id_country}
                              >
                                {value.name}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                  </div>
                  <button type="submit">Update</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Account;
