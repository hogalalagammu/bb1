import mongoose from "mongoose"

const Mproductschema = new  mongoose.Schema({
    id :String,
    url:String,
    gg:String,
    detailsUrl:String,
    title:Object,
    price:Object,
    description:String,
    discount:String,
    tagline:String
});

const Mobile = new mongoose.model("Mobile" , Mproductschema);

export default Mobile;