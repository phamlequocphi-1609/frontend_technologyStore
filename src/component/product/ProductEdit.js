import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Api from "../../Api";

function ProductEdit() {
  let params = useParams();
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const [input, setInput] = useState({
    name: "",
    price: "",
    category: "",
    brand: "",
    status: 0,
    sale: "",
    company: "",
    detail: "",
    description: "",
  });
  const fileType = ["png", "jpg", "jpeg", "PNG", "JPG"];
  const [file, setFile] = useState([]);
  const [fileApi, setFileApi] = useState([]);
  const [nameError, setNameError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [brandError, setBrandError] = useState("");
  const [statusError, setStatusError] = useState("");
  const [companyError, setCompanyError] = useState("");
  const [detailError, setDetailError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [avatarError, setAvatarError] = useState([]);
  const [idUser, setIdUser] = useState("");
  const [deleteImg, setDeleteImg] = useState([]);
  const [Category, setCategory] = useState([]);
  const [Brand, setBrand] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    Api.get("/category-brand")
      .then((response) => {
        setCategory(response.data.category);
        setBrand(response.data.brand);
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    let config = {
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    };
    Api.get("/user/product/" + params.id, config)
      .then((response) => {
        const data = response.data.data;
        setInput({
          name: data.name,
          price: data.price,
          category: data.id_category,
          brand: data.id_brand,
          status: data.status,
          sale: data.sale,
          company: data.company,
          detail: data.detail,
          description: data.description,
        });
        setFileApi(data.image);
        setIdUser(data.id_user);
      })
      .catch((error) => console.log(error));
  }, [params.id]);
  function fetchCategory() {
    if (Object.keys(Category).length > 0) {
      return Category.map((value, key) => {
        return (
          <option key={key} value={value.id}>
            {value.category}
          </option>
        );
      });
    }
  }
  function fetchBrand() {
    if (Brand.length > 0) {
      return Brand.map((val, key) => {
        return (
          <option key={key} value={val.id}>
            {val.brand}
          </option>
        );
      });
    }
  }
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput((prev) => ({ ...prev, [name]: value }));
  };
  const handleFile = (e) => {
    const files = e.target.files;
    setFile((prevFiles) => [...prevFiles, ...files]);
  };
  function handleCheckboxImg(imageName) {
    if (deleteImg.includes(imageName)) {
      setDeleteImg(deleteImg.filter((name) => name !== imageName));
    } else {
      setDeleteImg([...deleteImg, imageName]);
    }
  }
  const renderSaleOrNew = () => {
    if (input.status === 1) {
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="text"
            placeholder="Sale Price"
            name="sale"
            value={input.sale}
            onChange={handleInput}
            style={{ width: 200, marginRight: 10 }}
          />{" "}
          %
        </div>
      );
    }
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

      if (file.length > 6) {
        errorFile.push("You can only upload up to 6 images");
        isSuccess = false;
      }
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
      const totalImg = file.length + fileApi.length - deleteImg.length;
      if (totalImg > 6) {
        errorFile.push("You can only upload up to 6 images");
        isSuccess = false;
      }
      setAvatarError(errorFile);
    } else {
      setAvatarError([]);
    }

    if (isSuccess) {
      let url = "/user/product/update/" + params.id;
      let config = {
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      };
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("price", input.price);
      formData.append("category", input.category);
      formData.append("brand", input.brand);
      formData.append("company", input.company);
      formData.append("status", input.status);
      formData.append("sale", input.sale);
      formData.append("detail", input.detail);
      formData.append("description", input.description);
      formData.append("id_user", idUser);
      Object.keys(file).map((item) => formData.append("file[]", file[item]));
      deleteImg.forEach((imgName) => {
        formData.append("avatarCheckBox[]", imgName);
      });

      Api.post(url, formData, config)
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
      <div className="product__edit">
        <h2 className=" edit__title text-center text-[18px] font-bold text-[#2e3192] uppercase relative">
          Product Editing
        </h2>

        <div className="product__add__box relative">
          <form onSubmit={handleSubmit}>
            <div className="form__group">
              <div className="col-span-12">
                <input
                  type="text"
                  placeholder="Username"
                  name="name"
                  onChange={handleInput}
                  value={input.name}
                />
              </div>
              <p className="error__form">{nameError}</p>
            </div>
            <div className="form__group">
              <div className="col-span-12">
                <input
                  type="text"
                  placeholder="Price"
                  name="price"
                  onChange={handleInput}
                  value={input.price}
                />
              </div>
              <p className="error__form">{priceError}</p>
            </div>
            <div className="form__group">
              <select
                name="category"
                onChange={handleInput}
                value={input.category}
              >
                <option>Please select category</option>
                {fetchCategory()}
              </select>
              <p className="error__form">{categoryError}</p>
            </div>
            <div className="form__group">
              <select name="brand" onChange={handleInput} value={input.brand}>
                <option>Please select brand</option>
                {fetchBrand()}
              </select>
              <p className="error__form">{brandError}</p>
            </div>
            <div className="form__group">
              <select name="status" onChange={handleInput} value={input.status}>
                <option value={0}>New</option>
                <option value={1}>Sale</option>
              </select>
              {renderSaleOrNew()}
              <p className="error__form">{statusError}</p>
            </div>
            <div className="form__group">
              <input
                type="text"
                placeholder="Company"
                name="company"
                onChange={handleInput}
                value={input.company}
              />
              <p className="error__form">{companyError}</p>
            </div>
            <div className="form__group">
              <input type="file" name="avatar" multiple onChange={handleFile} />
              {avatarError.map((value, key) => (
                <p className="error__form" key={key}>
                  {value}
                </p>
              ))}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  justifyContent: "space-center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    justifyContent: "space-center",
                  }}
                >
                  {file.map((image, index) => (
                    <div key={index} style={{}}>
                      <img
                        src={URL.createObjectURL(image)}
                        alt=""
                        className="w-[100px] h-[100px] object-cover mb-3 mr-3"
                      />
                      <input
                        type="checkbox"
                        onChange={() => handleCheckboxImg(image.name)}
                      />
                    </div>
                  ))}
                </div>
                {fileApi.map((image, index) => (
                  <div key={index}>
                    <img
                      src={
                        "http://localhost:8800/my-shop/public/upload/product/" +
                        idUser +
                        "/" +
                        image
                      }
                      alt=""
                      className="w-[100px] h-[100px] object-cover mb-3 mr-3"
                    />
                    <input
                      type="checkbox"
                      onChange={() => handleCheckboxImg(image)}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="form__group">
              <textarea
                placeholder="Detail"
                name="detail"
                onChange={handleInput}
                value={input.detail}
              ></textarea>
              <p className="error__form">{detailError}</p>
            </div>
            <div className="form__group">
              <textarea
                placeholder="Description"
                name="description"
                onChange={handleInput}
                value={input.description}
              ></textarea>
              <p className="error__form">{descriptionError}</p>
            </div>
            <button type="submit">Edit</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default ProductEdit;
