import express from "express";
const router = new express.Router();
import Products from "../models/productschema.js";
import Watch from "../models/cs2.js";
import Mobile from "../models/cs3.js";
import gymc2 from "../models/gymc2.js";
import laptop from "../models/laptop.js"
import User from "../models/userschema.js";
import bcrypt from "bcryptjs";
import athenticate from '../middleware/authanticate.js'
import Wproducts from '../models/cs2.js'
import Sproducts from '../models/cs3.js'
import stripe from 'stripe';
// const stripe = new stripe(process.env.STRIPE_KEY, {
//     apiVersion: '2020-08-27', // Ensure you're using the latest API version
//   });

router.post("/checkout", async (req, res) => {
    // console.log("hogaga bhai");
    try {
        const stripeinstance = stripe(process.env.STRIPE_KEY)
        const session = await stripeinstance.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: req.body.items.map(item => {
                return {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: item.name
                        },
                        unit_amount: (item.price) * 100,
                    },
                    quantity: item.quantity
                }
            }),

            success_url: "http://localhost:3000/po",
            cancel_url: "http://localhost:3000/op"

        })
        res.json({ url: session.url })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})






router.get("/getproducts", async (req, res) => {
    try {
        const productsdata = await Products.find();
        res.status(201).json(productsdata);
        // console.log("hihihi" + productsdata);
    }
    catch (error) {
        // console.log("error" + error.message);
    }
})
router.get("/getProductsW", async (req, res) => {
    try {
        const Wproductsdata = await Wproducts.find();
        res.status(201).json(Wproductsdata);
        // console.log("hihihi" + Wproductsdata);
    }
    catch (error) {
        // console.log("error" + error.message);
    }
})
router.get("/getProductsS", async (req, res) => {
    try {
        const Sproductsdata = await Sproducts.find();
        res.status(201).json(Sproductsdata);
        // console.log("hihihi" + Sproductsdata);
    }
    catch (error) {
        // console.log("error" + error.message);
    }
})
router.get("/getProductggy", async (req, res) => {
    try {
        const Sproductsdata = await gymc2.find();
        res.status(201).json(Sproductsdata);
        // console.log("hihihi" + Sproductsdata);
    }
    catch (error) {
        // console.log("error" + error.message);
    }
})
router.get("/getProductllap", async (req, res) => {
    try {
        const Sproductsdata = await laptop.find();
        res.status(201).json(Sproductsdata);
        // console.log("hihihi" + Sproductsdata);
    }
    catch (error) {
        // console.log("error" + error.message);
    }
})

router.get("/getproducts/:id", async (req, res) => {
    try {
        const { id } = req.params;
        // console.log(id);
        const inddata = await Products.findOne({ id: id });
        const inddataw = await Watch.findOne({ id: id });
        const inddatam = await Mobile.findOne({ id: id });
        const inddatag = await gymc2.findOne({ id: id });
        const inddatal = await laptop.findOne({ id: id });

        if (inddata) {
            res.status(201).json(inddata);
        }
        else if (inddatam) {
            res.status(201).json(inddatam);
        }
        else if (inddataw) {
            res.status(201).json(inddataw);
        }
        else if (inddatag) {
            res.status(201).json(inddatag);
        }
        else if (inddatal) {
            res.status(201).json(inddatal);
        }
        console.log(inddata);

    } catch (error) {
        res.status(400).json(inddata);
        // console.log("error" + error.message);
    }
})

router.post("/register", async (req, res) => {
    const { fname, email, mobile, password, cpassword } = req.body;

    if (!fname || !email || !mobile || !password || !cpassword) {
        return res.status(422).json({ error: "filll the all details" });
        // console.log("bhai nathi present badhi details");
    }
    else {
        try {

            const preuser = await User.findOne({ email: email });

            if (preuser) {
                return res.status(422).json({ error: "This email is already exist" });
            } else if (password !== cpassword) {
                return res.status(422).json({ error: "password are not matching" });;
            } else {

                const finaluser = new User({
                    fname, email, mobile, password, cpassword
                });

                const storedata = await finaluser.save();
                // console.log(storedata + "user successfully added");
                res.status(201).json(storedata);
            }

        } catch (error) {
            // console.log("error the bhai catch ma for registratoin time" + error.message);
            res.status(422).send(error);
        }
    }
})
router.post("/loggin", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ error: "fill the data" })
    };
    try {
        const userllogin = await User.findOne({ email: email });
        console.log(userllogin);
        if (userllogin) {
            const ismatch = await bcrypt.compare(password, userllogin.password);
            // console.log(ismatch);
            // console.log("jiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
            // const token = jwt.sign(
            //     { email: User.email, id: User._id },
            //     process.env.KEY,
            //     { expiresIn: "1h" }
            // );
            const token = await userllogin.generateAuthToken();

            if (!ismatch) {
                res.status(400).json({ error: "invalid detail" });
            }
            else {
                res.status(201).json(userllogin);
            }
        }
        else {
            res.status(400).json({ error: "invalid detail" });
        }
    } catch (error) {
        res.status(400).json({ error: error })
    }
})
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ error: "fill the data" })
    };
    try {
        const userllogin = await User.findOne({ email: email });
        // console.log(userllogin + "opopopopopopopo");
        if (userllogin) {
            const ismatch = await bcrypt.compare(password, userllogin.password);
            // console.log(ismatch);
            // console.log("ji");

            const token = await userllogin.generateAuthToken();
            // const token = jwt.sign(
            //     { email: User.email, id: User._id },
            //     process.env.KEY,
            //     { expiresIn: "1h" }
            // );
            console.log(token);
            if (!ismatch) {
                res.status(400).json({ error: "invalid detail" });
            }
            else {
                res.status(201).json(token);
            }
        }
        else {
            res.status(400).json({ error: "invalid detail" });
        }
    } catch (error) {
        res.status(401).json({ error: error });
    }
})

router.get("/remcart/:id", athenticate, async (req, res) => {
    console.log("cartkjm");
    try {
        const { id } = req.params;
        const usercontact = await User.findOne({ _id: req.userID });

        if (usercontact) {

            const cartdata = await usercontact.remcartdata(id);
            // console.log(cartdata + "ddd");
            await usercontact.save();
            // console.log("Item removed from cart");
            res.status(201).json(usercontact);

        }
        else {
            res.status(401).json({ error: "invalid user" });
        }

    } catch (error) {
        // console.log("ky hogaya" + error);
    }
})


router.get("/addcart/:id", athenticate, async (req, res) => {
    console.log(req.headers.authorization);
    try {
        const { id } = req.params;
        // const cart = await Products.findOne({id:id});
        const inddata = await Products.findOne({ id: id });
        const inddataw = await Watch.findOne({ id: id });
        const inddatam = await Mobile.findOne({ id: id });



        const usercontact = await User.findOne({ _id: req.userID });
        // console.log(usercontact);

        if (usercontact) {
            if (inddata) {
                const cartdata = await usercontact.addcartdata(inddata);
                await usercontact.save();
                // console.log(cartdata);
                res.status(201).json(usercontact);
            }
            else if (inddatam) {
                const cartdata = await usercontact.addcartdata(inddatam);
                await usercontact.save();
                // console.log(cartdata);
                res.status(201).json(usercontact);
            }
            else if (inddataw) {
                const cartdata = await usercontact.addcartdata(inddataw);
                await usercontact.save();
                // console.log(cartdata);
                res.status(201).json(usercontact);
            }


        }
        else {
            res.status(401).json({ error: "invalid user" });
        }

    } catch (error) {
        console.log(error + " 1 1 1");
    }
})

router.get("/cartdetails", athenticate, async (req, res) => {
    try {
        const buyuser = await User.findOne({ _id: req.userID });
        res.status(201).json(buyuser);
    } catch (error) {
        // console.log("eooijkjj" + error)
    }
})
router.get("/validuser", athenticate, async (req, res) => {
    // console.log("nhi hoora");
    try {
        const validuserone = await User.findOne({ _id: req.userID });
        res.status(201).json(validuserone);
    } catch (error) {
        // console.log("eooijkjj" + error)
    }
})

router.get("/remove/:id", athenticate, async (req, res) => {
    try {
        const { id } = req.params;
        // console.log(User);
        req.rootuser.carts = req.rootuser.carts.filter((curel) => {
            return curel.id != id
        });

        req.rootuser.save();
        res.status(201).json(req.rootuser);
        // console.log("iteam remove");

    } catch (error) {
        // console.log(error + "jwt provide then remove");
        res.status(400).json(error);
    }
});
router.get("/logout", athenticate, (req, res) => {
    try {

        req.rootuser.tokens = req.rootuser.tokens.filter((curelem) => {
            return curelem.token !== req.token
        });
        res.clearCookie("bazar", { path: "/" });
        req.rootuser.save();
        res.status(201).json(req.rootuser.toekns)

    } catch (error) {
        // console.log("erroe for user log out ");
    }
})

export default router;


// useEffect(() => {
//     //check if token is stored
//     const token = localStorage.getItem("token");

//     if (token) {
//         // Directly make the API call to fetch user information
//         axios
//             .get(`${SERVER_URL}/user`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             })
//             .then((response) => {
//                 setUserName(response.data.name);
//                 setcartid(response.data.cartid);
//                 setuserinfo({
//                     userid: response.data.userid,
//                     cartid: response.data.cartid,
//                 });
//             })
//             .catch((error) => {
//                 console.error("Error fetching user data: ", error.message);
//             });
//     }
// }, []);