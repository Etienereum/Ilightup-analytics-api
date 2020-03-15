const router = require('express').Router();
const User = require ('../model/User');
const { registerValidation, loginValidation } = require ('../validation');
const bycrypt = require ('bcryptjs');
const jwt = require('jsonwebtoken');

// Registration
router.post('/register', async (req, res) => {
    // check data validity
    const { error } =  registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check is user exist
    const emailExist = await User.findOne({ email: req.body.email});
    const nameExist = await User.findOne({ name: req.body.name});
    if (emailExist || nameExist) return res.status(400).send('User already exist');

    // Hashing the password
    const salt = await bycrypt.genSalt(10);
    const hashPwd = await bycrypt.hash(req.body.password, salt)

    // Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPwd,
    });
    
    try{
        const savedUser = await user.save();
        res.send({ user: user._id });
    } catch (err){
        res.status(400).send(err);
    }
});

// Login
router.post('/login', async (req, res) => {
    
    // check data validity
    const { error } =  loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    // Check is user exist
    const user = await User.findOne({ email: req.body.email});
    if (!user) return res.status(400).send('Email or Password is Wrong');

    // Cheak if pwd is correct
    const vaildPass = await bycrypt.compare(req.body.password, user.password);
    if (!vaildPass) return res.status(400).send('Email or Password is Wrong');

    // Create JWT
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
});

module.exports = router;
