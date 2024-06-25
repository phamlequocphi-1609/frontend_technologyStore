import { useEffect, useState } from "react";
import Api from "../../Api";

function Category() {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    Api.get("/category-brand")
      .then((response) => {
        setCategory(response.data.category);
      })
      .catch((error) => console.log(error));
  }, []);
  const fetchCategory = () => {
    if (Object.keys(category).length > 0) {
      return category.map((value, key) => {
        return (
          <div className="panel__heading" key={key}>
            <h4 className="panel__title">
              <a href>{value.category}</a>
            </h4>
          </div>
        );
      });
    }
  };
  return (
    <div className="category">
      <h2>
        <img src={require("../Layouts/img/Home/category_icon.png")} alt="" />
        Category
      </h2>
      <div className="category__product">
        <div className="panel">{fetchCategory()}</div>
      </div>
    </div>
  );
}
export default Category;
