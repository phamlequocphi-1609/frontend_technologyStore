import "./App.css";
import Header from "./component/Layouts/Header";
import Slider from "./component/Layouts/Slider";
import { useLocation, useParams } from "react-router-dom";
import Menuleft from "./component/Layouts/Menuleft";
import Categorytab from "./component/product/Categorytab";
import Footer from "./component/Layouts/Footer";
import Scrollup from "./component/Layouts/Scrollup";
import MenuAccount from "./component/Layouts/MenuAccount";

function App(props) {
  const path = useLocation();
  const blog = path.pathname === "/blog";
  const detail = path.pathname.includes("/blog/detail");
  const cart = path.pathname === "/cart";
  const pay = path.pathname === "/pay";
  const discount = path.pathname === "/discount";

  return (
    <>
      <Header />
      {path.pathname === "/" ? <Slider /> : ""}
      <section className="mt-[160px]">
        <section id="homeItems">
          <div className="max-w-[1280px] mx-auto px-3">
            <div className="grid grid-cols-12">
              {blog || detail || cart || pay || discount ? (
                ""
              ) : path.pathname.includes("/product/detail") ||
                path.pathname === "/login" ||
                path.pathname === "/register" ||
                path.pathname.includes("/product/category") ||
                path.pathname.includes("/product/wishlist") ||
                path.pathname.includes("/product/search") ||
                path.pathname.includes("/product/priceRange") ||
                path.pathname.includes("/order/received") ? (
                ""
              ) : (<Menuleft /> && path["pathname"].includes("account")) ||
                path["pathname"].includes("myProduct") ? (
                <MenuAccount />
              ) : (
                <Menuleft />
              )}
              {props.children}
            </div>
          </div>
        </section>
        <section id="homeItems">
          <div className="max-w-[1280px] mx-auto px-3">
            {path.pathname === "/" ? <Categorytab /> : ""}
          </div>
        </section>
      </section>
      <Footer />
      <Scrollup />
    </>
  );
}

export default App;
