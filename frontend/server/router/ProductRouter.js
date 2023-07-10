const express = require('express')
const router = express.Router()
const Product = require('../models/Products')

// get all products
router.get('/products' , async (req,res) => {
    try {
        let products = await Product.find()
        res.status(200).json(products)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error : error.message
        })
    }
})


// get a single products
router.get('/products/:id', async (req,res) =>{ 
    const productId = req.params.id
    try {
        let products = await Product.findById(productId)
        res.status(200).json(products)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error : error.message
        })
    }
})


// create products
router.post('/products/', async (req,res) => {

    let newProduct = {
        name: req.body.name,
        image: req.body.image,
        price: req.body.price,
        qty: req.body.qty,
        info: req.body.info
    }

    try {
        let product = await Product.findOne({name: newProduct.name})
        if(product){
            return  res.status(400).json({
                    msg: 'Product is already Exits'
            })
        }

        product = new Product(newProduct)
        product = await product.save()
        // console.log(product)
        res.status(200).json({
            result: 'Product creation success',
            product: product
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error : error.message
        })
    }
})


// update a product
router.put('/products/:id' , async (req,res) => {
    let productId = req.params.id;
    let updateProduct = {
        name: req.body.name,
        image: req.body.image,
        price: req.body.price,
        qty: req.body.qty,
        info: req.body.info
    }

    try {
        let product = await Product.findById(productId)
        if(!product){
            return  res.status(400).json({
                    msg: 'Product is not Exits'
            })
        }

        product = await Product.findByIdAndUpdate(productId, {
            $set: updateProduct
        } , {new: true})  
        res.status(200).json({
            result: 'Product successfully updated',
            product: product
        })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                error : error.message
            })
        }
 
})


// delete a product
router.delete('/products/:id', async (req,res) => {
    let productId = req.params.id
    try {
        let product = await Product.findById(productId)
        if(!product){
            return  res.status(400).json({
                    msg: 'Product is not Exits'
            })
        }

        product = await Product.findByIdAndDelete(productId) 
        res.status(200).json({
            result: 'Product deleted successfully',
            product: product
        })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                error : error.message
            })
        }
})

module.exports = router