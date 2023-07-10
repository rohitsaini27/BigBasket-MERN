import React, { useEffect, useState } from "react";
import image1 from "../../assets/products/apple.jpg";
import axios from "axios";
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const dataUrl = "http://localhost:5000/api/products";
    axios.get(dataUrl)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error);
      });
  }, []);

  return (
    <>
      <section className="mt-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h3 text-success">Product List</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex
                impedit, incidunt ipsum nulla sapiente sint suscipit? A animi,
                error et fuga ipsum minus, nam officia praesentium quisquam,
                recusandae soluta voluptate?
              </p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="row">
            {products.length > 0 &&
              products.map((product) => {
                return (
                  <div className="col-md-3" key={product._id}>
                    <div className="card">
                      <div className="card-header text-center bg-white">
                        <img
                          src={product.image}
                          alt=""
                          width="150"
                          height="150"
                        />
                      </div>
                      <div className="card-body rgba-light-green-light">
                        <ul className="list-group">
                          <li className="list-group-item">
                            NAME : {product.name}
                          </li>
                          <li className="list-group-item">
                            PRICE : &#8377; {product.price.toFixed(2)}
                          </li>
                          <li className="list-group-item">
                            QTY : {product.qty} Kgs
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="row">
            <div className="col">
              {
                // for empty data
                products.length === 0 && (
                  <p className="font-weight-bold text-success text-center">
                    NO Records Found in Database
                  </p>
                )
              }
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductList;
