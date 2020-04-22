const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserModel = require('../models/user-model');
const keys = require('../config/keys');
const NetworkUtils = require('../utils/network-utils');

exports.registerNonGoogleUser = async (req, res, next) =>{
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

            jwt.sign({id: user._id}, keys.JWT_SECRET, {expiresIn: 86400}, 
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
            jwt.sign({id: user._id}, keys.JWT_SECRET, {expiresIn: 86400}, 
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
        const user = await UserModel.findOne({ email: req.body.email }).select('googleID status');

        if (user.googleID){
            return res.status(400).json({ error: "Login using google login!" });
        } else {
            user.status = 1;
            await jwt.sign({id: user._id}, keys.JWT_SECRET, {expiresIn: 86400}, 
                async (error, token) => {
                    if (error) throw(error.message);
                    const sections = token.toString().split('.');
                    await NetworkUtils.sendEmail(
                        req.body.email, 
                        'Reset Passwrod Link', 
                        `This reset link is only valid for 24 hours. After 24 hours please request for a new link.<br/>
                        <a href='http:localhost:5000/api/auth/reset-password/${sections[0]}/${sections[1]}/${sections[2]}' target='_blank'>Reset link</a>`);
                    res.json({msg: 'Email Sent!'});
                });
        }
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