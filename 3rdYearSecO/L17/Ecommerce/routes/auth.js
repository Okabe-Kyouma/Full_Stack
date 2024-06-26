const express = require('express');
const router = express.Router();
const User = require('../model/user');
const passport = require('passport')
router.get('/signup',(req,res)=>{
    res.render('auth/signup')
})
router.post('/signup',async (req,res)=>{
    //  console.log(req.body)
    const {username,password,email,role} = req.body;
    const newUser = new User({username,email,role});
    console.log(newUser);
    await User.register(newUser,password);
    res.redirect('/login')
})
router.get('/login',(req,res)=>{
    res.render('auth/login')
})

router.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    console.log(req.user)
    res.redirect('/product');
  });
module.exports = router;