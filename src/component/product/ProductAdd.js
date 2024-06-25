import { useEffect, useState } from "react";
import Api from "../../Api";
import { useNavigate } from "react-router-dom";

function ProductAdd() {
  const [input, setInput] = useState({
    name: "",
    price: "",
    category: "",
    brand: "",
    status: 0,
    salePrice: "",
    company: "",
    description: "",
    detail: "",
    avatar: [],
  });
  const fileType = ["png", "jpg", "jpeg", "PNG", "JPG"];
  const [file, setFile] = useState([]);
  const [nameError, setNameError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [brandError, setBrandError] = useState("");
  const [companyError, setCompanyError] = useState("");
  const [detailError, setDetailError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [avatarError, setAvatarError] = useState([]);
  const [brand, setBrand] = useState([]);
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();
  let accessToken = JSON.parse(localStorage.getItem("accessToken"));
  let userData = JSON.parse(localStorage.getItem("appState"));

  useEffect(() => {
    Api.get("/category-brand")
      .then((response) => {
        console.log(response);
        setBrand(response.data.brand);
        setCategory(response.data.category);
      })
      .catch((error) => console.log(error));
  }, []);
  function fetchCategory() {
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
  function fetchBrand() {
    if (Object.keys(brand).length > 0) {
      return brand.map((value, key) => {
        return (
          <option key={key} value={value.id}>
            {value.brand}
          </option>
        );
      });
    }
  }
  const renderSaleOrNew = () => {
    if (input.status === "1") {
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="text"
            placeholder="Sale Price"
            name="salePrice"
            onChange={handleInput}
            style={{ width: 200, marginRight: 10 }}
          />{" "}
          %
        </div>
      );
    }
  };
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput((prev) => ({ ...prev, [name]: value }));
  };
  const handleFile = (e) => {
    const files = e.target.files;
    setFile((prevFiles) => [...prevFiles, ...files]);
  };

  function handleSubmit(e) {
    e.preventDefault();
    let isSuccess = true;
    if (input.name === "") {
      setNameError("This is required");
      isSuccess = false;
    } else {
      setNameError("");
    }
    if (input.price === "") {
      setPriceError("This is required");
      isSuccess = false;
    } else {
      setPriceError("");
    }
    if (input.category === "") {
      setCategoryError("This is required");
      isSuccess = false;
    } else {
      setCategoryError("");
    }
    if (input.brand === "") {
      setBrandError("This is required");
      isSuccess = false;
    } else {
      setBrandError("");
    }
    if (input.company === "") {
      setCompanyError("This is required");
      isSuccess = false;
    } else {
      setCompanyError("");
    }
    if (input.detail === "") {
      setDetailError("This is required");
      isSuccess = false;
    } else {
      setDetailError("");
    }
    if (input.description === "") {
      setDescriptionError("This is required");
      isSuccess = false;
    } else {
      setDescriptionError("");
    }
    if (file) {
      const errorFile = [];
      if (file.length === 0) {
        errorFile.push("This is required");
        isSuccess = false;
      }
      if (file.length > 0) {
        for (let i = 0; i < file.length; i++) {
          const currentFile = file[i];
          if (currentFile.size > 1024 * 1024) {
            errorFile.push("The file size must be less than 1MB");
            isSuccess = false;
          } else if (!fileType.includes(currentFile.name.split(".").pop())) {
            errorFile.push(
              "Image file extensions are required: png, jpg, jpeg, PNG, JPG"
            );
            isSuccess = false;
          }
        }
      }
      if (file.length > 6) {
        errorFile.push("You can only upload up to 6 images");
        isSuccess = false;
      }
      setAvatarError(errorFile);
    } else {
      setAvatarError([]);
    }

    if (isSuccess) {
      let url = "/user/product/add";
      let config = {
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      };
      const formdata = new FormData();
      formdata.append("id_user", userData.id);
      formdata.append("name", input.name);
      formdata.append("price", input.price);
      formdata.append("category", input.category);
      formdata.append("brand", input.brand);
      formdata.append("status", input.status);
      formdata.append("sale", input.salePrice);
      formdata.append("company", input.company);
      formdata.append("detail", input.detail);
      formdata.append("description", input.description);

      Object.keys(file).map((val, key) => {
        return formdata.append("file[]", file[val]);
      });
      Api.post(url, formdata, config)
        .then((response) => {
          if (response.data.errors) {
            console.log(response.data.errors);
          } else {
            console.log(response);
            navigate("/myProduct");
          }
        })
        .catch((error) => console.log(error));
    }
  }

  return (
    <div className="col-span-8">
      <div className="product__add">
        <h2 className=" add__title text-center text-[18px] font-bold text-[#2e3192] uppercase relative mb-3">
          Create Product
        </h2>
      </div>
      <div className="product__add__box relative">
        <form onSubmit={handleSubmit}>
          <div className="form__group">
            <div className="col-span-12">
              <input
                type="text"
                placeholder="Product name"
                name="name"
                onChange={handleInput}
              />
            </div>
            <p className="error__form">{nameError}</p>
          </div>
          <div className="form__group">
            <div className="col-span-12">
              <input
                type="text"
                placeholder="price"
                name="price"
                onChange={handleInput}
              />
            </div>
            <p className="error__form">{priceError}</p>
          </div>
          <div className="form__group">
            <select name="category" onChange={handleInput}>
              <option>Please select category</option>
              {fetchCategory()}
            </select>
            <p className="error__form">{categoryError}</p>
          </div>
          <div className="form__group">
            <select name="brand" onChange={handleInput}>
              <option>Please select brand</option>
              {fetchBrand()}
            </select>
            <p className="error__form">{brandError}</p>
          </div>
          <div className="form__group">
            <select name="status" value={input.status} onChange={handleInput}>
              <option value="0">New</option>
              <option value="1">Sale</option>
            </select>

            {renderSaleOrNew()}
          </div>
          <div className="form__group">
            <input
              type="text"
              placeholder="Company"
              name="company"
              onChange={handleInput}
            />
            <p className="error__form">{companyError}</p>
          </div>
          <div className="form__group">
            <input
              type="file"
              name="avatar"
              accept="image/*"
              multiple
              onChange={handleFile}
            />
            <div className="flex mb-4">
              {file.map((val, key) => (
                <img
                  key={key}
                  src={URL.createObjectURL(val)}
                  className="w-[100px] h-[100px] mr-3"
                />
              ))}
            </div>
            {avatarError.map((value, key) => (
              <p className="error__form" key={key}>
                {value}
              </p>
            ))}
          </div>
          <div className="form__group">
            <textarea
              placeholder="Description"
              name="description"
              onChange={handleInput}
            ></textarea>
            <p className="error__form">{descriptionError}</p>
          </div>
          <div className="form__group">
            <textarea
              placeholder="Detail"
              name="detail"
              onChange={handleInput}
            ></textarea>
            <p className="error__form">{detailError}</p>
          </div>
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
}
export default ProductAdd;
