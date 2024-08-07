const mongoose = require('mongoose');
const {createHmac, randomBytes } = require('crypto')
const {createTokenForUser} = require('../utils/authentication')

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    salt:{
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true,
    },
    profileImageURL:{
        type: String,
        default: '/images/default.png',
    },
    role: {

        type: String,
        enum: ["User", "Admin"],
        default: "User",
    }
}, {timestamps: true});

userSchema.pre("save", function(next){
    const user = this;

    if(!user.isModified("password")) return;

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac('sha256', salt)
        .update(user.password)
        .digest("hex")

    this.salt = salt;
    this.password = hashedPassword;

    next();
});

userSchema.static("findUserIfExistAndGenerateToken",async function(email, password){
    const user = await this.findOne({email});
    if(!user) throw new Error('User not found!');

    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedHash = createHmac('sha256', salt)
    .update(password)
    .digest("hex") 

    if(hashedPassword !== userProvidedHash) throw new Error('Incorrect Password!');
    //return {...user._doc, password: undefined, salt: undefined};
    //Instead of returning user return token
    const token = createTokenForUser(user);
    return token;

})


const User = mongoose.model("user", userSchema);

module.exports = User;