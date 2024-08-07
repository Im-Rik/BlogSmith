const JWT = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || "default_secret_here";


const createTokenForUser = (user) => {
    const payload = {
        _id: user.id,
        fullname: user.fullName,
        email: user.email,
        profileImageURL: user.profileImageURL,
        role: user.role

    }

    const token = JWT.sign(payload, secret);

    return token;
}

const validateToken = (token) => {
    try{
    const payload = JWT.verify(token, secret);
    return payload;
    } catch(e) {
        console.log(e.message);
        return null;
    }

}

module.exports = {
    createTokenForUser,
    validateToken
}