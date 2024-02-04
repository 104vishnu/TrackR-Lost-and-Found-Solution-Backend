import User from "../models/user.model.js";
import Item from "../models/item.model.js"
import createError from "../utils/createError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const logout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out.");
};

export const register = async (req,res,next)=>{

    try {

      console.log(req.body);
        const hash = bcrypt.hashSync(req.body.password,5);

        const newUser = new User({
            ...req.body,
            password:hash
        });

        await newUser.save();
    res.status(201).send("User has been created.");
        
    } catch (err) {

        console.log("user not created");
    
        next(err);
        
    }

};

export const login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email });

    if (!user) return next(createError(404, "User not found!"));

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);

    if (!isCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      {
        id: user._id
      },
      process.env.JWT_KEY
    );

    // Destructuring to exclude password from the response
    const { password, ...info} = user._doc;

    

    


    res
    .cookie("accessToken", token, {
      httpOnly: true,
    })
    .status(200)
    .send(info);
  } 
  catch (err) 
  {
    next(err);
  }
};


export const postItem = async (req,res,next)=>
{
  try {

    console.log(req.userId);

    console.log(req.body);

    const newItem = new Item({
      itemname:req.body.itemName,
      itemtype:req.body.itemType,
      itemdesc:req.body.itemDesc,
      img:req.body.file,
      userId:req.userId


    });

   await newItem.save();
   res.status(201).send("Item has been saved.");

    
  } catch (err) {

    console.log("item not saved");
    next(err);
    
  }


};

export const  lostItems = async(req,res,next) =>
{
  try {

    console.log("lostItems functions start")
    // Fetch all items where itemType is 'lost'
    const lostItemsData = await Item.find({ itemtype: 'lost' });
    console.log(lostItemsData);

    if (!lostItemsData) return next(createError(404, "lostItems not found!"));

    res.status(200).send(lostItemsData);
  } catch (err) {
    console.error('Error fetching lost items:', err);
    
  }
  
};

export const  foundItems = async(req,res,next) =>
{
  try {

    console.log("foundItems functions start")
    // Fetch all items where itemType is 'found'
    const foundItemsData = await Item.find({ itemtype: 'found' });
    console.log(foundItemsData);

    if (!foundItemsData) return next(createError(404, "foundItems not found!"));

    res.status(200).send(foundItemsData);
  } catch (err) {
    console.error('Error fetching found items:', err);
    
  }
};

export const myItems = async (req,res,next) =>
{
  try {

    console.log("myItems functions start")
    // Fetch all items where itemType is 'found'
    const myItemsData = await Item.find({ userId:req.userId });
    console.log(myItemsData);

    if (!myItemsData) return next(createError(404, "myItems not found!"));

    res.status(200).send(myItemsData);
  } catch (err) {
    console.error('Error fetching my items:', err);
    
  }

}