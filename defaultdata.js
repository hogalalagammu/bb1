import Products from "./models/productschema.js";
import c2 from "./constant/c2.js"
import c3 from "./constant/c3.js"
import gym from "./constant/gym.js"
import lap from "./constant/lap.js"
import Productdata from "./constant/productdata.js";
import cs2 from "./models/cs2.js";
import cs3 from "./models/cs3.js";
import gymc2 from "./models/gymc2.js";
import laptop from "./models/laptop.js";
const DefaultData = async()=>{
    try{

        await Products.deleteMany({});
        await cs2.deleteMany({});
        await cs3.deleteMany({});
        await gymc2.deleteMany({});
        await laptop.deleteMany({});
        const stroreData = await Products.insertMany(Productdata);
        const sc2 = await cs2.insertMany(c2);
        const sc3 = await cs3.insertMany(c3);
        const sc4= await gymc2.insertMany(gym);
        const sc5= await laptop.insertMany(lap);
        // console.log(stroreData);
    }
    catch(error){
        console.log("error"+ error.message);
    }
};
 export  { DefaultData };