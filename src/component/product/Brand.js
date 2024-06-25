import { useEffect, useState } from "react";
import Api from "../../Api";

const Brand = () => {
  const [brand, setBrand] = useState([]);
  useEffect(() => {
    Api.get("/category-brand")
      .then((response) => {
        setBrand(response.data.brand);
      })
      .catch((error) => console.log(error));
  }, []);
  function fetchBrand() {
    if (Object.keys(brand).length > 0) {
      return brand.map((val, key) => {
        return (
          <div className="panel__heading" key={key}>
            <h4 className="panel__title">
              <a href>{val.brand}</a>
            </h4>
          </div>
        );
      });
    }
  }
  return (
    <div className="brand">
      <h2>
        <img src={require("../Layouts/img/Home/brand.png")} alt="" />
        Brand
      </h2>
      <div className="brand__name">
        <div className="panel">{fetchBrand()}</div>
      </div>
    </div>
  );
};
export default Brand;
