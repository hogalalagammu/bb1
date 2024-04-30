import mongoose from "mongoose"

const lap = new  mongoose.Schema({
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

const laptop = new mongoose.model("lap" , lap);

export default laptop;