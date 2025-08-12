const User = require('../models/user.model');
const authUtil = require('../utl/authentication');
const validation = require('../utl/validation');
const flashedSession = require('../utl/session-flash');
const session = require('express-session');
function getSignup(req,res,next){
    let sessionData = flashedSession.getSessionData(req);
    if(!sessionData){
        sessionData = {
            email: '',
            confirmEmail: '',
            password: '',
            name: '',
            postal: '',
            address: '',
            city: '',
            errorMessage: ''
        }
    }
    res.render('customers/auth/signup', { sessionData: sessionData});
}
async  function signup(req,res,next){
    const userInputs = {
            email: req.body.email,
            confirmEmail: req.body['confirm-email'],
            password: req.body.password,
            name: req.body.fullname,
            postal: req.body.postal,
            address: req.body.address,
            city: req.body.city,
            errorMessage:'User exists already! Try logging in instead!'
    }
    if(!validation.userDetailssAreValid(
        req.body.email,
        req.body.password,
        req.body.fullname,
        req.body.postal,
        req.body.address,
        req.body.city
         
    ) || 
    !validation.emailIsConfirmed(
        req.body.email,
        req.body['confirm-email']
    )){
        flashedSession.flashDataToSession(req,{
            errorMessage:'please check  your input password must be at least 6 characters long, postal code must be 5 digit number',
            ...userInputs
        },function(){
            res.redirect('/signup');
        })
        return;
    }

    const user = new User(
        req.body.email,
        req.body.password,
        req.body.fullname,
        req.body.postal,
        req.body.address,
        req.body.city
    );

    try{
        const existingAlready = await user.existsAlready();
        if(existingAlready){
            // res.redirect('/signup');
            flashedSession.flashDataToSession(req,{
                ...userInputs
            },function(){
                res.render('customers/auth/signup',{sessionData:userInputs});
            })
            
            return;
        }
        await user.signup();    
    }catch(error){
        next(error);
        return;
    }
    res.redirect('/login');
}
function getLogin(req,res,next){
    let loggedData = flashedSession.getSessionData(req);
    if(!loggedData){
        loggedData = {
            email: '',
            confirmEmail: '',
            password: '',
            name: '',
            postal: '',
            address: '',
            city: '',
            errorMessage: ''

        };
    }
    res.render('customers/auth/login',{savedData: loggedData});
}
async function login(req,res){
    const userdata = new User(req.body.email,req.body.password);
    const existingUser = await userdata.getUserWithSameEmail();
    const errorData = {
        errorMessage:'Invalid input-please double check the input data again!',
        email:userdata.email,
        password:userdata.password
    }
    if(!existingUser){
        flashedSession.flashDataToSession(req,errorData,function(){
            res.redirect('/login');
        })
        return;
    }
    const passwordIsCorrect = await userdata.hashChangePassword(existingUser.password);
    if(!passwordIsCorrect){
        flashedSession.flashDataToSession(req,errorData,function(){
            res.redirect('/login');
        })
        return;
    }
    authUtil.createUserSession(req,existingUser,function(){
    res.redirect('/');
    });
}
function logout(req,res){
    authUtil.destroyUserAuthSession(req);
    res.redirect('/signup');
}

module.exports = {
    getSignup: getSignup,
    getLogin: getLogin,
    signup:signup,
    login:login,
    logout:logout
}