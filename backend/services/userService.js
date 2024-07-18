const User=require('../models/user')
const bcrypt=require('bcrypt')
const {supportedStocks}=require('../services/stockService')
const jwt = require('jsonwebtoken');
require('dotenv').config();

const createUser=async(userData)=>{

    const existingUser=await User.findOne({email:userData.email});

    if(existingUser){
     throw new Error("User Already exist")
    }
    const hashedPassword = bcrypt.hashSync(userData.password, 10);
    const user = new User({
        email: userData.email,
        password: hashedPassword
      });

    await user.save();
    return user;
}

const logInUser = async (email, password) => {
    try {
        console.log(email)
        const user = await User.findOne({ email });
        if(!user){
            throw new Error("No user")
        }
        if (user) {
             
            const isPasswordMatch = bcrypt.compareSync(password, user.password);
            console.log(isPasswordMatch)
            if (isPasswordMatch) {
                const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                const  data={ token, subscriptions: user.subscriptions }
                return data
            } else {
                throw new Error('Invalid Password');
            }
        } else {
            throw new Error('Invalid login credentials');
        }

    } catch (error) {
        throw new Error('Invalid Password');
    }
};

const subscribe =  async (userId, ticker) => {
    if (!supportedStocks.includes(ticker)) {
      throw new Error('Unsupported stock');
    }
  
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { subscriptions: ticker } },
      { new: true }
    );
  
    if (!user) {
      throw new Error('User not found');
    }
  
    return user.subscriptions;
  };

  


module.exports={createUser,logInUser,subscribe}