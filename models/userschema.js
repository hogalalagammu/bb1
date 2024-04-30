import mongoose from "mongoose"
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import { config } from 'dotenv';
// config();
const secretKey = process.env.KEY;
const userschema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        trim: true

    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("NOt valid email address")
            }
        }
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
        maxlength: 10
    },
    password: {
        type: String,
        required: true,
        unique: true,
        minlength: 6
    },
    cpassword: {
        type: String,
        required: true,
        unique: true,
        minlength: 6
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ],
    carts: [

    ]
});

userschema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12)
        this.cpassword = await bcrypt.hash(this.cpassword, 12)

    }
    next();

})
userschema.methods.generateAuthToken = async function () {
    try {
        console.log("ji");
        // let token = jwt.sign({_id:this._id},secretKey)
        let token = jwt.sign(
            { _id: this._id },
            secretKey,
            { expiresIn: "1h" }
        );
        this.tokens = this.tokens.concat({ token: token })
        await this.save();
        console.log(token._id + "            ===================================================================                 " + this._id);
        return token;
    } catch (error) {
        console.log(error)
    }

}

userschema.methods.addcartdata = async function (cart) {
    try {
        this.carts = this.carts.concat(cart);
        await this.save;
        return this.carts;
    } catch (error) {
        console.log(error);
    }
}

userschema.methods.remcartdata = async function (cart) {
    console.log("papa is grat");
    try {
        // this.carts=this.carts.concat(cart);

        const indexToRemove = this.carts.findIndex(item => item.id === cart);
        // usercontact.carts.splice(indexToRemove, 1);
        console.log(indexToRemove);
        this.carts.splice(indexToRemove, 1);

        await this.save;

        return this.carts;
    } catch (error) {
        console.log(error);
    }
}





const USER = new mongoose.model("USER", userschema);
// console.log(secretKey); 

export default USER;