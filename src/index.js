import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import Productdetail from "./component/product/Productdetail";
import Login from "./component/members/Login";
import Register from "./component/members/Register";
import Account from "./component/members/Account";
import Myproduct from "./component/product/Myproduct";
import ProductAdd from "./component/product/ProductAdd";
import ProductEdit from "./component/product/ProductEdit";
import Blog from "./component/Blog/Blog";
import Detail from "./component/Blog/Detail";
import Cart from "./component/product/Cart";
import Pay from "./component/product/Pay";
import Discount from "./component/product/Discount";
import PaginationNext from "./component/Blog/PaginationNext";
import { Provider } from "react-redux";
import store from "./Store";
import ProductCategoryBrand from "./component/product/ProductCategoryBrand";
import ProductCategory from "./component/product/ProductCategory";
import ProductWishlist from "./component/product/ProductWishlist";
import ProductSearch from "./component/product/ProductSearch";
import ProductPriceRange from "./component/product/ProductPriceRange";
import Paysuccess from "./component/product/Paysuccess";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <App>
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/account" element={<Account />} />
            <Route path="/myProduct" element={<Myproduct />} />
            <Route path="/product/detail/:id" element={<Productdetail />} />
            <Route path="/product/add" element={<ProductAdd />} />
            <Route path="/product/edit/:id" element={<ProductEdit />} />
            <Route
              path="/product/category/:category"
              element={<ProductCategory />}
            />
            <Route
              path="/product/category/:category/:brand"
              element={<ProductCategoryBrand />}
            />
            <Route path="/product/wishlist" element={<ProductWishlist />} />
            <Route path="/product/search" element={<ProductSearch />} />
            <Route path="/product/priceRange" element={<ProductPriceRange />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/detail/:id" element={<Detail />} />
            <Route
              path="/blog/detail-pagination/:id"
              element={<PaginationNext />}
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="/pay" element={<Pay />} />
            <Route
              path="/order/received/:code/:date"
              element={<Paysuccess />}
            />
            <Route path="/discount" element={<Discount />} />
          </Routes>
        </App>
      </Router>
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
