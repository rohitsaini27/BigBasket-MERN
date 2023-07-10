import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    image: "",
    price: "",
    qty: "",
    info: ""
  })

  const navigate = useNavigate()

  const [submitted, setSubmitted] = useState()

  let updateInput = (event) => {
    setProduct({
      ...product,
      [event.target.name] : event.target.value
    })
  }

  let updateImage = async (event) => {
    let imageFile = event.target.files[0];
    let base64Image = await convertBase64String(imageFile);
    setProduct({
      ...product,
      image: base64Image
    })
  };

let convertBase64String = (imageFile)  => {
    return new Promise((resolve, reject) => {
        let fileReader = new FileReader();
        fileReader.readAsDataURL(imageFile);
        fileReader.addEventListener('load', () => {
            if(fileReader.result){
                resolve(fileReader.result);
            }
            else {
                reject('Error Occurred');
            }
        })
    });
};

  let submitProduct = (event) => {
    event.preventDefault()
    const dataUrl = 'http://localhost:5000/api/products/'
    axios.post(dataUrl, product).then(() => {
      setSubmitted(true)
    }).catch((error) => {
      console.log(error)
    })
  }

  return (
    <>
    {
      submitted ? navigate('/products/admin') : 
      <>  
      <div className="container mt-3">
        <div className="row">
          <div className="col">
            <p className="h3 text-success">Create Product</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex
              impedit, incidunt ipsum nulla sapiente sint suscipit? A animi,
              error et fuga ipsum minus, nam officia praesentium quisquam,
              recusandae soluta voluptate?
            </p>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="card animated zoomInLeft delay-1s">
                <div className="card-header bg-success text-white">
                  <p className="h4">Create Product</p>
                </div>
                <div className="card-body rgba-green">
                  <form onSubmit={submitProduct}>
                    <div className="form-group">
                      <input
                        required
                        name="name"
                        value={product.name}
                        onChange={updateInput}
                        type="text"
                        className="form-control"
                        placeholder="Name"
                      />
                    </div>
                    <div className="form-group mt-2">
                    
                      <div className="custom-file">
                     
                      <input
                        required
                        name="image"
                        onChange={updateImage}
                        className="form-control"
                        type="file"
                        id="formFile"
                      />
                      </div>
                      {/* <label className="custom-file-label" htmlFor="custom-file">
                        {
                          product.image !== '' ?
                          <img src={product.image} alt="" width='25' height='25'/> :
                          <span>Product Image</span>
                        }
                      </label> */}
                    </div>
                    <div className="form-group mt-2">
                      <input
                        required
                        name="price"
                        value={product.price}
                        onChange={updateInput}
                        type="number"
                        className="form-control"
                        placeholder="Price"
                      />
                    </div>
                    <div className="form-group mt-2">
                      <input
                        required
                        name="qty"
                        type="number"
                        value={product.qty}
                        onChange={updateInput}
                        className="form-control"
                        placeholder="Qty"
                      />
                    </div>
                    <div className="form-group mt-2">
                      <textarea
                        required
                        name="info"
                        value={product.info}
                        onChange={updateInput}
                        rows={3}
                        className="form-control"
                        placeholder="Information"
                      />
                    </div>
                    <div className="form-group mt-2">
                      <input
                        type="submit"
                        className="btn btn-success btn-sm"
                        value="Create"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
    }
    </>
  );
};

export default CreateProduct;
