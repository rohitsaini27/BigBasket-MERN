import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateProduct = () => {
  const productId = useParams().id;
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState({
    name: "",
    image: "",
    price: "",
    qty: "",
    info: "",
  });
  const [submitted, setSubmitted] = useState(false);

 
  useEffect(() => {
    let dataUrl = `http://localhost:5000/api/products/${productId}`
    axios.get(dataUrl).then((response) => {
        setSelectedProduct(response.data)
    }).catch((error) => {
        console.log(error)
    })
  }, [productId])

  let updateInput = (event) => {
    setSelectedProduct({
      ...selectedProduct,
      [event.target.name]: event.target.value,
    });
  };

  let updateImage = async (event) => {
    let imageFile = event.target.files[0];
    let base64Image = await convertBase64String(imageFile);
    setSelectedProduct({
      ...selectedProduct,
      image: base64Image,
    });
  };

  let convertBase64String = (imageFile) => {
    return new Promise((resolve, reject) => {
      let fileReader = new FileReader();
      fileReader.readAsDataURL(imageFile);
      fileReader.addEventListener("load", () => {
        if (fileReader.result) {
          resolve(fileReader.result);
        } else {
          reject("Error Occurred");
        }
      });
    });
  };

  const submitProduct = (event) => {
    event.preventDefault();
        let dataURL = `http://localhost:5000/api/products/${productId}`;
        axios.put(dataURL, selectedProduct).then((response) => {
            setSubmitted(true)
        }).catch((error) => {
            console.error(error);
        })
  };

  return (
    <>
      {submitted ? (
        navigate("/products/admin")
      ) : (
        <>
          {/*<pre>{JSON.stringify(selectedProduct)}</pre>*/}
          <section className="mt-3">
            <div className="container">
              <div className="row">
                <div className="col">
                  <p className="h3 text-secondary">Update Product</p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex
                    impedit, incidunt ipsum nulla sapiente sint suscipit? A
                    animi, error et fuga ipsum minus, nam officia praesentium
                    quisquam, recusandae soluta voluptate?
                  </p>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-md-4">
                  <div className="card">
                    <div className="card-header bg-secondary text-white">
                      <p className="h4">Update Product</p>
                    </div>
                    <div className="card-body rgba-green-light">
                      <form onSubmit={submitProduct}>
                        <div className="form-group">
                          <input
                            required
                            name="name"
                            onChange={updateInput}
                            value={selectedProduct.name}
                            type="text"
                            className="form-control"
                            placeholder="Name"
                          />
                        </div>
                        <div className="form-group mt-2">
                          <input
                            name="image"
                            onChange={updateImage}
                            className="form-control"
                            type="file"
                            id="formFile"
                          />
                          {/* <img
                            src={selectedProduct.image}
                            alt=""
                            width="25"
                            height="25"
                          /> */}
                        </div>
                        <div className="form-group mt-2">
                          <input
                            required
                            name="price"
                            onChange={updateInput}
                            value={selectedProduct.price}
                            type="number"
                            className="form-control"
                            placeholder="Price"
                          />
                        </div>
                        <div className="form-group mt-2">
                          <input
                            required
                            name="qty"
                            onChange={updateInput}
                            value={selectedProduct.qty}
                            type="number"
                            className="form-control"
                            placeholder="Qty"
                          />
                        </div>
                        <div className="form-group mt-2">
                          <textarea
                            required
                            name="info"
                            onChange={updateInput}
                            value={selectedProduct.info}
                            rows={3}
                            className="form-control"
                            placeholder="Information"
                          />
                        </div>
                        <div className="form-group mt-2">
                          <input
                            type="submit"
                            className="btn btn-secondary btn-sm"
                            value="Update"
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default UpdateProduct;
