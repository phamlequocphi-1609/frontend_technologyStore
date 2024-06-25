import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Api from "../../Api";
import { useSelector } from "react-redux";
import ProductSearch from "../product/ProductSearch";

function Header() {
  const navigate = useNavigate();
  const [isViewLogout, setIsViewLogout] = useState(false);
  const [isDown, setDown] = useState(false);
  const [isOverlay, setOverlay] = useState(false);
  const loggedState = localStorage.getItem("Logged");
  const userdata = JSON.parse(localStorage.getItem("appState"));
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const tongqty = useSelector((state) => state.tongqty.tongqty);
  const tongprice = useSelector((state) => state.tongprice.tongprice);
  const totalWishlist = useSelector(
    (state) => state.totalWishlist.totalWishlist
  );
  let cart = JSON.parse(localStorage.getItem("cart")) || {};
  const [price, setPrice] = useState(0);
  const [qty, setQty] = useState(0);
  const [clickCategoryTablet, setClickCategoryTablet] = useState("");
  let wishlistCart = JSON.parse(localStorage.getItem("WishlistCart")) || [];
  const [wishlist, setWishlist] = useState(0);
  useEffect(() => {
    Api.get("/category-brand")
      .then((response) => {
        setCategory(response.data.category);
        setBrand(response.data.brand);
      })
      .catch((error) => console.log(error));
    let total = 0;
    let totalQty = 0;
    Object.keys(cart).map((key) => {
      total += cart[key].totalPrice;
      totalQty += cart[key].qty;
    });
    setPrice(total);
    setQty(totalQty);
    let totalWish = 0;
    Object.keys(wishlistCart).map((value) => {
      totalWish += value.length;
    });
    setWishlist(totalWish);
  }, [tongprice, tongqty, totalWishlist]);
  const handleClickLogout = () => {
    setIsViewLogout(!isViewLogout);
  };
  const logout = () => {
    localStorage.removeItem("Logged");
    navigate("/login");
    setIsViewLogout(false);
  };
  const ViewLogout = () => {
    return (
      <div className="downMenuLogout hover:cursor-pointer">
        <p>
          <button onClick={logout}>Logout</button>
        </p>
        <p>
          <Link to="/account">Profile</Link>
        </p>
      </div>
    );
  };
  const renderLogin = () => {
    if (loggedState && userdata) {
      const username = userdata.name;
      const userAvatar = userdata.avatar;
      return (
        <li className="dropdown">
          <div className="inline-block" onClick={handleClickLogout}>
            <img
              className="user__img"
              src={`http://localhost:8800/my-shop/public/upload/api/member/${userAvatar}`}
              alt="User Avatar"
            />
            <svg
              className="chevron__down mt-5 text-xl cursor-pointer fill-[#022549] font-bold"
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 512 512"
            >
              <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
            </svg>
            <p className="text-[14px] font-medium text-[#696763]">{username}</p>
          </div>
          {isViewLogout && <ViewLogout />}
        </li>
      );
    } else {
      return (
        <li className="dropdown">
          <Link className="text-[#738790] text-[16px] font-[600]" to="/login">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16"
              width="14"
              viewBox="0 0 448 512"
              className="ml-3"
            >
              <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
            </svg>
            Login
          </Link>
        </li>
      );
    }
  };

  const handleClickDown = () => {
    setDown(!isDown);
  };
  // apply tablet
  function changeIcon(category) {
    if (clickCategoryTablet === category && isDown === true) {
      return (
        <button
          className="absolute right-0 top-[24px] rotate-[-180deg]"
          onClick={handleClickDown}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="16"
            width="16"
            viewBox="0 0 512 512"
          >
            <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
          </svg>
        </button>
      );
    } else {
      return (
        <button
          className="absolute right-0 top-[24px] rotate-[-180deg]"
          onClick={handleClickDown}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="16"
            width="16"
            viewBox="0 0 512 512"
          >
            <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z" />
          </svg>
        </button>
      );
    }
  }
  function renderBrandTablet() {
    if (clickCategoryTablet === "Smartphone") {
      return brand
        .filter((value) => [1, 2, 3].includes(value.id))
        .map((val, key) => {
          return (
            <li key={key} className="py-2">
              <a className="" href>
                {val.brand}
              </a>
            </li>
          );
        });
    } else if (clickCategoryTablet === "Laptop") {
      return brand
        .filter((value) => [4, 7, 8].includes(value.id))
        .map((val, key) => {
          return (
            <li key={key} className="py-2">
              <a className="" href>
                {val.brand}
              </a>
            </li>
          );
        });
    } else if (clickCategoryTablet === "Tablet") {
      return brand
        .filter((value) => [9, 10].includes(value.id))
        .map((val, key) => {
          return (
            <li key={key} className="py-2">
              <a className="" href>
                {val.brand}
              </a>
            </li>
          );
        });
    } else {
      return brand
        .filter((value) => [11, 12].includes(value.id))
        .map((val, key) => {
          return (
            <li key={key} className="py-2">
              <a className="" href>
                {val.brand}
              </a>
            </li>
          );
        });
    }
  }
  function renderItem(category) {
    if (isDown === true && clickCategoryTablet === category) {
      return <ul className="pb-7 pt-3 pl-4">{renderBrandTablet()}</ul>;
    }
  }
  function handleClickCategoryTablet(category) {
    setClickCategoryTablet(category);
    console.log(category);
  }
  const renderCategoryTablet = () => {
    if (category.length > 0) {
      return category.map((value, key) => {
        let img = "";
        if (value.id === 1) {
          img = (
            <img
              src={require("./img/Home/smartphone-1-24x24.png")}
              alt=""
              className="ml-2"
            />
          );
        } else if (value.id === 2) {
          img = (
            <img
              src={require("./img/Home/laptop-2-24x24.png")}
              alt=""
              className="ml-2"
            />
          );
        } else if (value.id === 3) {
          img = (
            <img
              src={require("./img/Home/tablet-1-24x24.png")}
              alt=""
              className="ml-2"
            />
          );
        } else if (value.id === 5) {
          img = (
            <img
              src={require("./img/Home/headset-1-24x24.png")}
              alt=""
              className="ml-2"
            />
          );
        }
        return (
          <li
            key={key}
            className="list__item py-3 border-b border-[#e3e3e3] relative"
          >
            <Link onClick={() => handleClickCategoryTablet(value.category)}>
              {img}
              <span>{value.category}</span>
              {changeIcon(value.category)}
            </Link>
            {renderItem(value.category)}
          </li>
        );
      });
    }
  };
  const handleOpen = () => {
    setOverlay(true);
  };
  const handleCloseOverlay = () => {
    setOverlay(false);
  };
  function renderCategorySearch() {
    if (Object.keys(category).length > 0) {
      return category.map((value, key) => {
        return (
          <option key={key} value={value.id}>
            {value.category}
          </option>
        );
      });
    }
  }
  function renderSmartphoneBrand() {
    if (Object.keys(brand).length > 0) {
      return brand.map((val, key) => {
        if (val.id == 1 || val.id == 2 || val.id == 3) {
          return (
            <li className="menu__item">
              <Link
                className="menu__item__link"
                to={
                  `/product/category/smartphone/` +
                  val.brand.replace(/\s+/g, "-").toLowerCase()
                }
              >
                {val.brand}
              </Link>
            </li>
          );
        }
      });
    }
  }
  function renderSmartphone() {
    if (Object.keys(category).length > 0) {
      return category.map((val, key) => {
        if (val.category == "Smartphone") {
          return (
            <li key={key} className="category__item">
              <Link
                className="category__item__link"
                to={`/product/category/` + val.category.toLowerCase()}
              >
                <img
                  src={require("./img/Home/smartphone-1-24x24.png")}
                  alt=""
                />
                <span>{val.category}</span>
              </Link>
              <div className="category__menu">
                <ul className="menu__list">{renderSmartphoneBrand()}</ul>
              </div>
            </li>
          );
        }
      });
    }
  }
  function renderLaptop() {
    if (Object.keys(category).length > 0) {
      return category.map((value, key) => {
        if (value.category === "Laptop") {
          return (
            <li key={key} className="category__item">
              <Link
                className="category__item__link"
                to={`/product/category/` + value.category.toLowerCase()}
              >
                <img src={require("./img/Home/laptop-2-24x24.png")} alt="" />
                <span>{value.category}</span>
              </Link>
              <div className="category__menu">
                <ul className="menu__list">
                  {brand.length > 0 &&
                    brand.map((value, key) => {
                      if (value.id === 4 || value.id === 7 || value.id === 8) {
                        return (
                          <li className="menu__item">
                            <Link
                              className="menu__item__link"
                              to={
                                `/product/category/laptop/` +
                                value.brand.replace(/\s+/g, "-").toLowerCase()
                              }
                            >
                              {value.brand}
                            </Link>
                          </li>
                        );
                      }
                    })}
                </ul>
              </div>
            </li>
          );
        }
      });
    }
  }
  function renderTablet() {
    if (Object.keys(category).length > 0) {
      return category.map((val, key) => {
        if (val.category === "Tablet") {
          return (
            <li key={key} className="category__item">
              <Link
                className="category__item__link"
                to={`/product/category/` + val.category.toLowerCase()}
              >
                <img src={require("./img/Home/tablet-1-24x24.png")} alt="" />
                <span>{val.category}</span>
              </Link>
              <div className="category__menu">
                <ul className="menu__list">
                  {brand.length > 0 &&
                    brand.map((val, key) => {
                      if (val.id === 9 || val.id === 10) {
                        return (
                          <li key={key} className="menu__item">
                            <Link
                              className="menu__item__link"
                              to={
                                `/product/category/tablet/` +
                                val.brand.replace(/\s+/g, "-").toLowerCase()
                              }
                            >
                              {val.brand}
                            </Link>
                          </li>
                        );
                      }
                    })}
                </ul>
              </div>
            </li>
          );
        }
      });
    }
  }
  function renderAccessory() {
    if (Object.keys(category).length > 0) {
      return category.map((val, key) => {
        if (val.category === "Accessory") {
          return (
            <li key={key} className="category__item">
              <Link
                className="category__item__link"
                to={`/product/category/` + val.category.toLowerCase()}
              >
                <img src={require("./img/Home/headset-1-24x24.png")} alt="" />
                <span>{val.category}</span>
              </Link>
              <div className="category__menu">
                <ul className="menu__list">
                  {brand.length > 0 &&
                    brand.map((val, key) => {
                      if (val.id === 11 || val.id === 12) {
                        return (
                          <li key={key} className="menu__item">
                            <Link
                              className="menu__item__link"
                              to={
                                `/product/category/accessory/` +
                                val.brand.replace(/\s+/g, "-").toLowerCase()
                              }
                            >
                              {val.brand}
                            </Link>
                          </li>
                        );
                      }
                    })}
                </ul>
              </div>
            </li>
          );
        }
      });
    }
  }
  function renderTotalPrice() {
    if (price === 0) {
      return (
        <span className="carr__title">
          <span>Cart /</span>
          <span>0đ</span>
        </span>
      );
    } else {
      return (
        <span className="carr__title">
          <span>Cart /</span>
          <span>{price.toLocaleString("vi-VN")}đ</span>
        </span>
      );
    }
  }
  function renderTotalQty() {
    if (qty === 0) {
      return (
        <span className="cart__icon relative inline-block cursor-pointer">
          <img src={require("./img/Home/cart_img.png")} alt="" />
          <span className="cart__notice absolute">0</span>
        </span>
      );
    } else {
      return (
        <span className="cart__icon relative inline-block cursor-pointer">
          <img src={require("./img/Home/cart_img.png")} alt="" />
          <span className="cart__notice absolute">{qty}</span>
        </span>
      );
    }
  }
  function renderTotalWishlist() {
    if (wishlist === 0) {
      return (
        <span className="relative">
          <svg
            className="heart__notice mr-3"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
          </svg>
          <span className="wishlist__notice absolute">0</span>
        </span>
      );
    } else {
      return (
        <span className="relative">
          <svg
            className="heart__notice mr-3"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
          </svg>
          <span className="wishlist__notice absolute">{wishlist}</span>
        </span>
      );
    }
  }
  const [itemSearch, setItemSearch] = useState("");
  const [suggesData, setSuggesdata] = useState([]);
  const [searchCategory, setSearchCategory] = useState("All");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const isClickformRef = useRef(null);

  useEffect(() => {
    const delayTime = setTimeout(() => {
      if (itemSearch.trim() === "" && searchCategory === "") {
        setSuggesdata([]);
        setShowSuggestions(false);
      } else {
        Api.get(
          `/product/search?search=${itemSearch}&category=${searchCategory}`
        )
          .then((response) => {
            setSuggesdata(response.data.data);
            setShowSuggestions(true);
          })
          .catch((error) => console.log(error));
      }
    }, 300);
    return () => clearTimeout(delayTime);
  }, [itemSearch, searchCategory]);
  const handleChangeSearchInformation = (e) => {
    setItemSearch(e.target.value);
  };
  function handleSearchClick(e) {
    e.preventDefault();
    setShowSuggestions(false);
    if (itemSearch.trim() !== "") {
      navigate("/product/search", { state: { itemSearch, suggesData } });
    }
  }
  const handleChangeSearchCategory = (e) => {
    const searchCategory = e.target.value;
    if (searchCategory === "All") {
      setSearchCategory("All");
    } else {
      setSearchCategory(searchCategory);
    }
  };
  const handleClickOutside = (event) => {
    if (
      isClickformRef.current &&
      !isClickformRef.current.contains(event.target)
    ) {
      setShowSuggestions(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const highLightKeyword = (name, key) => {
    if (key.trim() === "") {
      return name;
    } else {
      const parts = name.split(new RegExp(`(${key})`, "gi"));
      return parts.map((part, index) =>
        part.toLowerCase() === key.toLowerCase() ? (
          <strong key={index} className="font-bold">
            {part}
          </strong>
        ) : (
          <span key={index}>{part}</span>
        )
      );
    }
  };
  function handleClickiItemSuggested(idItem) {
    console.log(idItem);
    navigate("/product/detail/" + idItem);
    setItemSearch("");
  }
  function renderItemSuggested() {
    if (Object.keys(suggesData).length > 0) {
      return suggesData.map((value, key) => {
        const imgArr = JSON.parse(value.image);
        const firstImg = imgArr[0];
        const currentPrice = value.price * (1 - value.sale / 100);
        let priceStatus;
        if (value.status === 1) {
          priceStatus = (
            <>
              <span className="mr-1 ">
                {value.price.toLocaleString("vi-VN")}đ
              </span>
              <span className="line-through text-[#ccc]">
                {currentPrice.toLocaleString("vi-VN")}đ
              </span>
            </>
          );
        } else {
          priceStatus = (
            <span className="mr-1 ">
              {value.price.toLocaleString("vi-VN")}đ
            </span>
          );
        }
        return (
          <div
            onClick={() => handleClickiItemSuggested(value.id)}
            className="item__suggested flex"
            key={key}
          >
            <img
              className="w-[40px] rounded-[99px] h-[40px] mr-[10px]"
              src={
                "http://localhost:8800/my-shop/public/upload/product/" +
                value.id_user +
                "/" +
                firstImg
              }
            />
            <div className="search__name flex-1">
              {highLightKeyword(value.name, itemSearch)}
            </div>
            <div className="search__price">{priceStatus}</div>
          </div>
        );
      });
    }
  }
  const renderinforSuggesFrame = () => {
    if (itemSearch.trim() !== "" && showSuggestions) {
      return <div className="items__suggested ">{renderItemSuggested()}</div>;
    } else {
      return null;
    }
  };
  return (
    <header id="header" className="mb-5">
      <div className="header__top">
        <div className="max-w-[1280px] mx-auto px-3">
          <nav className="header__navbar">
            <div className="grid grid-cols-12">
              <div className="col-span-3 h-full md:hidden lg:block sm:hidden">
                <div className="navbar__logo">
                  <a href className="logo__link">
                    <img src={require("./img/Home/Shop_logo.png")} alt="" />
                  </a>
                  <a href className="logo__welcome no-underline">
                    <h3 className="logo__link uppercase text-[28px] text-[#2d6599] font-semibold">
                      Welcome
                    </h3>
                  </a>
                </div>
              </div>
              {/* header tablet */}
              <div className="md:col-span-1 lg:hidden">
                <Link onClick={handleOpen}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="30"
                    width="30"
                    viewBox="0 0 448 512"
                    className="mt-4 ml-3"
                  >
                    <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
                  </svg>
                </Link>
              </div>
              <div className=" md:col-span-7 lg:col-span-5 h-[70px]">
                <div className="navbar__select lg:z-10">
                  <ul className="select__list">
                    <li className="list__item pt-4">
                      <form
                        action=""
                        method="get"
                        onSubmit={handleSearchClick}
                        ref={isClickformRef}
                      >
                        <div className="form__category flex">
                          <div className="search__category">
                            <select
                              name=""
                              id="category"
                              onChange={handleChangeSearchCategory}
                            >
                              <option value="All" selected>
                                Select Category
                              </option>
                              {renderCategorySearch()}
                            </select>
                          </div>
                          <div className="search__infor flex-1 pl-[18px]">
                            <input
                              type="text"
                              placeholder="Enter the information"
                              onChange={handleChangeSearchInformation}
                              value={itemSearch}
                            />
                          </div>
                          <button className="btn__search ">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="1em"
                              viewBox="0 0 512 512"
                            >
                              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                            </svg>
                          </button>
                        </div>
                        {renderinforSuggesFrame()}
                      </form>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-span-4 h-[70px] md:hidden lg:block">
                <div className="navbar__information">
                  <ul className="information__list flex justify-around mb-0 items-center">
                    <li className="dropdown">
                      <Link
                        to="/cart"
                        className="dropdown__cart flex items-center"
                      >
                        {renderTotalPrice()}
                        {renderTotalQty()}
                      </Link>
                    </li>
                    <li className="dropdown">
                      <Link
                        to="/product/wishlist"
                        className="text-[#738790] text-[16px] font-[600]"
                      >
                        {renderTotalWishlist()}
                      </Link>
                    </li>
                    <li className="dropdown">
                      <Link
                        to="/register"
                        className="text-[#738790] text-[16px] font-[600]"
                      >
                        <img
                          className="w-4 ml-3"
                          src={require("./img/Home/register_icon.png")}
                        />
                        Register
                      </Link>
                    </li>
                    {renderLogin()}
                  </ul>
                </div>
              </div>
              {/* Tablet */}
              <div className="md:col-span-4 h-[70px] lg:hidden">
                <div className="navbar__information">
                  <ul className="information__list flex justify-around mb-0 items-center">
                    <li className="dropdown">
                      <Link
                        to="/cart"
                        className="dropdown__cart flex items-center"
                      >
                        {renderTotalQty()}
                      </Link>
                    </li>
                    <li className="dropdown">
                      <Link
                        to="/register"
                        className="text-[#738790] text-[16px] font-[600]"
                      >
                        <img
                          className="w-4 ml-3"
                          src={require("./img/Home/register_icon.png")}
                        />
                        Register
                      </Link>
                    </li>
                    {renderLogin()}
                  </ul>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <div className="header__bottom min-h-[52px] bg-[#fff] md:hidden lg:block ">
        <div className="max-w-[1280px] mx-auto px-3">
          <nav className="navbar__category">
            <ul className="category__list flex justify-around">
              <li className="category__item relative">
                <Link className="category__item__link" to="/">
                  <img
                    className="sale__img"
                    src={require("./img/Home/home.png")}
                    alt=""
                  />
                  <span className="pl-2.5">Home</span>
                </Link>
              </li>
              {renderSmartphone()}
              {renderLaptop()}
              {renderTablet()}
              {renderAccessory()}
              <li className="category__item">
                <Link className="category__item__link" to="/discount">
                  <img
                    className="sale__img"
                    src={require("./img/Home/sale.png")}
                    alt=""
                  />
                  <span>Discount</span>
                </Link>
              </li>
              <li className="category__item">
                <Link className="category__item__link" to="/blog">
                  <img
                    className="sale__img"
                    src={require("./img/Home/blog.png")}
                    alt=""
                  />
                  <span className="pl-2.5">Blog</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      {/* Menu tablet */}
      {isOverlay && (
        <>
          <nav className="nav__mobile md:fixed max-w-full w-[240px] bg-[#f5f7f7] z-[4] top-[70px] left-0 right-0  p-6 pt-0 relative  lg:hidden">
            <Link onClick={handleCloseOverlay}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="30"
                width="30"
                viewBox="0 0 384 512"
                className="absolute right-2 top-3 hover:cursor-pointer"
              >
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </Link>
            <ul className="mobile__list pt-[30px]">
              <li className="list__item py-3 border-b border-[#e3e3e3] relative">
                <Link className="" to="/">
                  <img
                    className="w-[18px] h-[18px] ml-[10px]"
                    src={require("./img/Home/home.png")}
                    alt=""
                  />
                  <span className="">Home</span>
                </Link>
              </li>
              <li className="list__item py-6 border-b border-[#e3e3e3] relative">
                <Link
                  to="/product/wishlist"
                  className="text-[#738790] text-[16px] font-[600]"
                >
                  {renderTotalWishlist()}
                  <span>Wishlist</span>
                </Link>
              </li>
              {renderCategoryTablet()}
            </ul>
          </nav>
          <div className="overlay" onClick={handleCloseOverlay}></div>
        </>
      )}
    </header>
  );
}
export default Header;
