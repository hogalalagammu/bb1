import mongoose from "mongoose"

const gymschema = new  mongoose.Schema({
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

const gym = new mongoose.model("gym" , gymschema);

export default gym;