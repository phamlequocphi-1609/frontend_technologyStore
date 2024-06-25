import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Api from "../../Api";

function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [errorApi, setErrorApi] = useState("");
  console.log(errorApi);
  const navigate = useNavigate();
  const handleInput = (e) => {
    const nameInput = e.target.name;
    const value = e.target.value;
    setInput((prev) => ({ ...prev, [nameInput]: value }));
  };
  function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }
  function handleForm(e) {
    e.preventDefault();
    let isCheck = true;
    if (input.email === "") {
      setEmailError("This is required");
      isCheck = false;
    } else if (!validateEmail(input.email)) {
      setEmailError("Email format is invalid");
      isCheck = false;
    } else {
      setEmailError("");
    }
    if (input.password === "") {
      setPassError("This is required");
      isCheck = false;
    } else {
      setPassError("");
    }
    if (isCheck) {
      const data = {
        email: input.email,
        password: input.password,
        level: 0,
      };
      Api.post("user/login", data)
        .then((response) => {
          if (response.data.errors) {
            console.log(response.data.errors.errors);
          } else {
            localStorage.setItem("Logged", true);
            localStorage.setItem(
              "appState",
              JSON.stringify(response.data.Auth)
            );
            localStorage.setItem(
              "accessToken",
              JSON.stringify(response.data.token)
            );
            navigate("/");
          }
        })
        .catch((error) => {
          console.log(error);
          setErrorApi(error.response.data.errors.errors);
        });
    }
  }
  return (
    <div className="col-span-12 px-14">
      <div className="login mt-8">
        <div className="grid grid-cols-12">
          <div className="col-span-7">
            <div className="login__left">
              <img src={require("../Layouts/img/member/login.png")} />
            </div>
          </div>
          <div className="col-span-5">
            <div className="login__right">
              <h2 className="text-center text-[36px] text-[#395ea1] font-semibold uppercase">
                Welcome!
              </h2>
              <h3 className="text-center text-[20px] text-[#61d7ff] font-semibold">
                Sing in to your account
              </h3>
              <form onSubmit={handleForm}>
                <p className="error__form">{errorApi}</p>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={handleInput}
                />
                <p className="error__form">{emailError}</p>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleInput}
                />
                <p className="error__form">{passError}</p>
                <Link className="text-center block text-[20px] text-[#516892] font-semibold mb-4">
                  Forgot Password ?
                </Link>
                <button type="submit" className="btn__in">
                  Sing in
                </button>
                <Link className="btn__up">Sing up</Link>
              </form>
              <div className="other__login mt-5">
                <p className="uppercase text-center text-[#ccc]">
                  or login with
                </p>
                <ul className="social">
                  <li>
                    <Link>
                      <img src={require("../Layouts/img/member/face.png")} />
                    </Link>
                  </li>
                  <li>
                    <Link>
                      <img src={require("../Layouts/img/member/google.png")} />
                    </Link>
                  </li>
                  <li>
                    <Link>
                      <img src={require("../Layouts/img/member/linked.png")} />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
