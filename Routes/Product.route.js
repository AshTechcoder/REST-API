
const express = require('express');
const router = express.Router();
const Product = require('../Models/Product.model');
const mongoose = require('mongoose');
const createError = require('http-errors');




///// Get all Product list....
router.get('/', async (req, res, next) => {

    try {
        /// with query parameters 
        // const result = await Product.find({price: 18999}, { __v: 0});

        /// with projection parameters
        const result = await Product.find({}, { __v: 0});

        res.send(result);
    } catch (error) {
        console.log(error.message);
    }

    // next(new Error('cannot get the all products...'))
    // res.send("getting all products list....");
});



///// Create all Product list....
router.post('/', async (req, res, next) => {
    
    try {
        const product = new Product(req.body);
        const result = await product.save();
        res.send(result);
    } catch (error) {
        if(error.name === 'ValidationError'){
            return next(createError(422, error.message));
        }

        next(error)
    }

//// ** Product are created using promises and then

    // console.log('creating all products....');
    // res.send(req.body);

    // const product = new Product({
    //     name: req.body.name,
    //     price: req.body.price
    // });

    // product.save()
    //     .then(result => {
    //         console.log(result);
    //         res.send(result);
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });

});



///// Get Product by id....
router.get('/:id', async (req, res, next) => {

    try {
        const id = req.params.id;
        const result = await Product.findById(id);

        if(!result){
            throw createError(404, 'Product not found');
        }

        res.send(result);

    } catch (error) {
        if(error instanceof mongoose.CastError){
            next(createError(400, 'Invalid Product id'));
            return;
        }
        next(error);
    }

    // res.send('getting single product by id');
});



///// Update Product by id....
router.patch('/:id', async (req, res, next) => {
    
    
    try {
        const id = req.params.id;
        const updates = req.body;
        const options = { new: true};

        const result = await Product.findByIdAndUpdate(id, updates, options);

        if(!result){
            throw createError(404, 'This product is no loger exits');
        }
        res.send(result);

    } catch (error) {
        if(error instanceof mongoose.CastError){
            return next(createError(400, 'Invalid product id'));
        }

        next(error);
    }

    // res.send('updating single product by id');
});



///// Delete Product by id....
router.delete('/:id', async (req, res, next) => {
        
    try {
        const id = req.params.id;
        const result = await Product.findByIdAndDelete(id);

        if(!result){
            throw createError(404, 'This product is no loger exits');
        }

        res.send(result);
    
    } catch (error) {
        if(error instanceof mongoose.CastError){
            next(createError(400, 'Invalid product id'));
            return;
        }
        next(error);
    }

    // res.send('deleting single product by id');
});


module.exports = router;
