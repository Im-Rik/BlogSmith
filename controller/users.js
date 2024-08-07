const User = require('../models/users');


const renderSignupPage = (req, res) => {
    res.render('signup');
};

const handleUserSignUp = async (req, res) => {
    const {fullname, email, password} = req.body;
    
    const alreadyPresent = await User.findOne({email: email});
    if(alreadyPresent) return res.render('signup', { 
        errorMessage: 'User already exists. Please try another email.' 
    });

    await User.create({
        fullName: fullname,
        email:email,
        password: password
    });
    res.redirect('/');
};

const renderLogInPage = (req, res) => {
    res.render('login');
};

const handleUserAuthentication = async (req, res) => {
    const {email, password} = req.body;
    
    try{
        const token = await User.findUserIfExistAndGenerateToken(email, password);
        // res.send(user)

        res.cookie('token', token).redirect('/')
    }catch (e){
        //res.send(e.message);
        res.render('login', {
            errorMessage: e.message
        });
    }
};  

const handleUserLogout = (req, res) => {
    res.clearCookie("token").redirect('/');
}

module.exports = {
    renderSignupPage,
    handleUserSignUp,
    renderLogInPage,
    handleUserAuthentication,
    handleUserLogout
}