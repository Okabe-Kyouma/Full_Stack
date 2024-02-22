const express = require('express');
const app = express();

app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));

const mongoose = require('mongoose');
const Product = require('./model/product');

mongoose.connect('mongodb://127.0.0.1:27017/restfull-J')
    .then(()=>{console.log('db conected')})
    .catch(()=>{console.log('DB not conected')})

app.get('/',async(req,res)=>{
    const products = await Product.find({});
    // console.log(products);
    res.render('products',{products})
})
app.get('/product/new',(req,res)=>{
    res.render('new');
})
app.post('/product/new',async (req,res)=>{
     const {name,price,rating,image,desc} = req.body;
     await Product.create({name,price,rating,image,desc});
     res.redirect('/');
})

app.get('/product/edit/:id',async (req,res)=>{
    const {id}= req.params;
    const product = await Product.findOne({_id:id})
    res.render('edit',{product});
})

app.post('/product/edit/:id',async (req,res)=>{
    const {id}= req.params;
    const {name,price,rating,image,desc} = req.body;
    await Product.updateOne({_id:id},{name,price,rating,image,desc});
    res.redirect('/');
})

app.post('/product/delete/:id',async (req,res)=>{
    const {id} = req.params;
    await Product.deleteOne({_id:id});
    res.redirect('/')
})

app.get('/product/show/:id',async (req,res)=>{
    const {id} = req.params;
    let product = await Product.findOne({_id:id});
    console.log(product);
    res.render('show',{product});
})

app.listen(5000,()=>{
    console.log('server run at port 5000');
})