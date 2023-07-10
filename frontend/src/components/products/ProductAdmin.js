import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductAdmin = () => {
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getAllProducts()
  }, []);

  const getAllProducts = () => {
    const dataUrl = "http://localhost:5000/api/products";
    axios
      .get(dataUrl)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error);
      });
  }

  const deleteProduct = (productId) => {
    const dataUrl = `http://localhost:5000/api/products/${productId}`
    axios.delete(dataUrl).then(() => {
        getAllProducts()
    }).catch((error) => {
        console.log(error)
    })
  }

  return (
    <>
      <section className="mt-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h3 text-success">Product Admin</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex
                impedit, incidunt ipsum nulla sapiente sint suscipit? A animi,
                error et fuga ipsum minus, nam officia praesentium quisquam,
                recusandae soluta voluptate?
              </p>
              <Link to="/products/create" className="btn btn-success btn-sm">
                Create Product
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <table className="table table-hover text-center table-striped">
                <thead className="bg-dark text-success">
                  <tr>
                    <th>SNO</th>
                    <th>Product</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length > 0 &&
                    products.map((product) => {
                      return (
                        <tr key={product._id}>
                          <td>{product._id?.substr(product._id.length - 5)}</td>
                          <td>
                            <img
                              src={product.image}
                              alt=""
                              width="50"
                              height="50"
                            />
                          </td>
                          <td>{product.name}</td>
                          <td>&#8377; {product.price.toFixed(2)}</td>
                          <td>{product.qty} Kgs</td>
                          <td>
                            <Link
                              to={`/products/${product._id}`}
                              className="btn btn-secondary btn-sm"
                            >
                              Update
                            </Link>
                            <button 
                            onClick={deleteProduct.bind(this, product._id)}
                            className="btn btn-danger btn-sm">
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  {
                    // for empty data
                    products.length === 0 && (
                      <tr>
                        <td className="text-success" colSpan={6}>
                          NO Records Found in Database
                        </td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductAdmin;
