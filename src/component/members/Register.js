import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Api from "../../Api";
function Register() {
  const [input, setInput] = useState({
    name: "",
    email: "",
    pass: "",
    phone: "",
    address: "",
    country: "",
  });
  const [country, setCountry] = useState([]);
  const fileType = ["png", "jpg", "jpeg", "PNG", "JPG"];
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [avatarError, setAvatarError] = useState("");
  const [countryError, setCountryError] = useState("");
  const [file, setFile] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    Api.get("/country")
      .then((response) => {
        setCountry(response.data.data);
      })
      .catch((error) => console.log(error));
  }, []);
  function fetchCountryData() {
    if (Object.keys(country).length > 0) {
      return country.map((value, key) => {
        return (
          <option key={key} value={value.id}>
            {value.name}
          </option>
        );
      });
    }
  }
  function handleUserAvatarFile(e) {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
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
  const handleSubmit = (e) => {
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
    if (input.country === "Select Country") {
      setCountryError("This is required");
      isCheck = false;
    } else if (input.country === "") {
      setCountryError("This is required");
      isCheck = false;
    } else {
      setCountryError("");
    }
    if (file === "") {
      setAvatarError("This is required");
      isCheck = false;
    } else {
      if (file.size > 1024 * 1024) {
        setAvatarError("This required file size is less than 1 MB");
      } else if (!fileType.includes(file.name.split(".").pop())) {
        setAvatarError(
          "Image file extensions are required: png, jpg, jpeg, PNG, JPG"
        );
      }
    }
    if (isCheck === true) {
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("email", input.email);
      formData.append("password", input.pass);
      formData.append("phone", input.phone);
      formData.append("address", input.address);
      formData.append("avatar", file);
      formData.append("country", input.country);
      Api.post("user/register", formData)
        .then((response) => {
          if (response.data.errors) {
            console.log(response.data.errors);
          } else {
            console.log(response);
            alert("You have successfully created an account. Please log in !");
            navigate("/login");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <div className="col-span-12 px-16 ">
      <div className="register mt-8 p-8 mb-8 relative">
        <div className="grid grid-cols-12">
          <div className="col-span-7 px-2">
            <div className="register__left">
              <h2 className="text-center text-[36px]  font-semibold mb-4">
                Hello, friend !
              </h2>
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16"
                    width="14"
                    viewBox="0 0 448 512"
                  >
                    <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                  </svg>
                  <input
                    placeholder="Name"
                    name="name"
                    onChange={handleInput}
                  />
                </div>
                <p className="error__form">{nameError}</p>
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16"
                    width="16"
                    viewBox="0 0 512 512"
                  >
                    <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                  </svg>
                  <input
                    placeholder="Email"
                    name="email"
                    onChange={handleInput}
                  />
                </div>
                <p className="error__form">{emailError}</p>
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16"
                    width="16"
                    viewBox="0 0 512 512"
                  >
                    <path d="M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0S160 78.8 160 176c0 18.7 2.9 36.8 8.3 53.7L7 391c-4.5 4.5-7 10.6-7 17v80c0 13.3 10.7 24 24 24h80c13.3 0 24-10.7 24-24V448h40c13.3 0 24-10.7 24-24V384h40c6.4 0 12.5-2.5 17-7l33.3-33.3c16.9 5.4 35 8.3 53.7 8.3zM376 96a40 40 0 1 1 0 80 40 40 0 1 1 0-80z" />
                  </svg>
                  <input
                    placeholder="Password"
                    name="pass"
                    type="password"
                    onChange={handleInput}
                  />
                </div>
                <p className="error__form">{passError}</p>
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16"
                    width="16"
                    viewBox="0 0 512 512"
                  >
                    <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
                  </svg>
                  <input
                    placeholder="Phone"
                    name="phone"
                    onChange={handleInput}
                  />
                </div>
                <p className="error__form">{phoneError}</p>
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16"
                    width="12"
                    viewBox="0 0 384 512"
                  >
                    <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                  </svg>
                  <input
                    placeholder="Address"
                    name="address"
                    onChange={handleInput}
                  />
                </div>
                <p className="error__form">{addressError}</p>
                <div className="">
                  <input
                    type="file"
                    accept="image/*"
                    name="avatar"
                    onChange={handleUserAvatarFile}
                  />
                </div>
                <p className="error__form">{avatarError}</p>
                <div className="form__group">
                  <select name="country" onChange={handleInput}>
                    <option>Select Country</option>
                    {fetchCountryData()}
                  </select>
                </div>
                <p className="error__form">{countryError}</p>
                <button type="submit">Create account</button>
              </form>
              <p className="text-center text-[#c4d6e3] text-[18px] font-normal">
                Already have an account ?{" "}
                <Link className="text-[#3e8abd] font-bold">Sing in</Link>
              </p>
            </div>
          </div>
          <div className="col-span-5 px-2">
            <div className="register__right">
              <img src={require("../Layouts/img/member/register.jpg")} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Register;
