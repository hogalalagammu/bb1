import mongoose from "mongoose"

const Wproductschema = new  mongoose.Schema({
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


const Watch = new mongoose.model("Watch" , Wproductschema);

export default Watch;