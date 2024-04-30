import mongoose from "mongoose"

const productschema = new  mongoose.Schema({
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


const Products = new mongoose.model("products" , productschema);

export default Products;