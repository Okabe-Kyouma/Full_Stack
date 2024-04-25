const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const {validateProduct} = require('../midillware/validateProduct')
const {islogedIn} = require('../midillware/validateuser');
const {isSeller} = require('../midillware/validateuser');

router.get('/products',async (req,res)=>{
    const products = await Product.find({}); 
    res.render('products/index',{products})
})

router.get('/product/new',islogedIn,isSeller,(req,res)=>{
    res.render('products/new')
})


router.post('/products',islogedIn,isSeller,validateProduct,async(req,res)=>{
    const {name,price,image,desc} = req.body;
    await Product.create({name,price,image,desc});
    req.flash('success','Product created succesfully')
    res.redirect('/products')
})



router.get('/products/:id',async (req,res)=>{
    const {id} = req.params;
    const product = await Product.findById(id).populate('reviews');
    res.render('products/show',{product});
    
})

router.get('/products/:id/delete',islogedIn,isSeller,async (req,res)=>{
    const {id} = req.params;
    await Product.findByIdAndDelete(id);
    req.flash('success','Product Deleted succesfully')
    res.redirect('/products')
    
})
module.exports = router;