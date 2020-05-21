const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {v4: uuidv4} = require('uuid');

const UserModel = require('../models/user-model');
const {sendEmail} = require('../utils/network-utils');

exports.registerNonGoogleUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({
            error: errors.array()
        });
    }

    try {
        let user = await UserModel.findOne({email: req.body.email});
        if (user) {
            return res.status(400).json({error: 'Email already registered'});
        } else {
            const hash = await bcrypt.hash(req.body.password, 12);
            user = new UserModel(req.body);
            user.hashedPassword = hash;
            user = await user.save();

            jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: 86400}, 
                (error, token) => {
                    if (error) throw(error.message);
                    res.json({token});
                });
        }
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({error: 'Something went wrong'});
    }
}

exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({
            error: errors.array()
        });
    }
    try {
        const user = await UserModel.findOne({ email: req.body.email }).select('googleID hashedPassword status');

        if (user.googleID){
            return res.status(400).json({ error: "Login using google login!" });
        }else if (user.status === 0 && await bcrypt.compare(req.body.password, user.hashedPassword)) {
            jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: 86400}, 
                (error, token) => {
                    if (error) throw(error.message);
                    res.json({token});
                });
        } else if (user.status === 1) {
            res.status(400).json({error: 'Password reset link sent on email!'})
        } else {
            res.status(400).json({error: 'Invalid email or password!'});
        }
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({error: 'Something went wrong'});
    }
}

exports.requestResetPassword = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({
            error: errors.array()
        });
    }
    try {
        const {email} = req.body;
        const user = await UserModel.findOne({ email }).select('googleID status resetToken');

        if (!user) return res.status(400).json({error: 'Email not registered please register'});
        if (user.googleID) return res.status(400).json({ error: "Login using google login!" });

        user.resetToken = uuidv4();

        const body = `<h1>Your requested password reset link is below</h1>
            <p>This link is only valid for 24 hours. Please use the latest link</p>
            <a href='http://localhost:3000/reset-password/${user.resetToken}/${user._id}'><h2>Reset Password Link</h2></a>`

        await sendEmail(email, 'Reset Password Link', body);

        user.status = 1;
        await user.save();

        res.json({message: 'Email is sent to your registered email'});
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({error: 'Something went wrong'});
    }
}

exports.authenticateUser = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.user_id).select('firstName lastName email joinedOn score authorityLevel');
        if (!user) {
            return res.status(400).json({error: 'User Not Found'});
        }
        res.json({user});
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({error: 'Something went wrong'});
    }
}

exports.verigyResetLink = async (req, res, next) => {
    const {token, id} = req.body;
    try {
        const user = await UserModel.findById(id).select('status resetToken');

        if (!user) return res.status(400).json({error: 'Invalid Link'});
        if (user.status != 1) return res.status(400).json({error: 'Invalid Link'});
        if (user.resetToken != token) return res.status(400).json({error: 'Invalid Link'});
        
        res.json({message: 'Authenticated User'});
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({error: 'Something went wrong'});
    }
}

exports.resetPassword = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({
            error: errors.array()
        });
    }

    const {id, password} = req.body;

    try {

        const user = await UserModel.findById(id).select('status resetToken hashedPassword');

        if (!user) return res.status(400).json({error: 'user not Unauthorized'});
        if (user.status !== 1) return res.status(400).json({error: 'status not Unauthorized'});

        user.resetToken = undefined;
        user.hashedPassword = await bcrypt.hash(req.body.password, 12);
        user.status = 0;

        await user.save();
        res.json({res: 'Success Please Login'});
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({error: 'Something went wrong'});
    }
}