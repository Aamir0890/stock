
const userService=require('../services/userService')
const {supportedStocks}=require('../services/stockService')

const createUser=async(req,res)=>{

    try {
        const data=req.body;
        console.log(data)
        const user=await userService.createUser(data)
         res.status(201).json("user created successfully")
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message
        });
    }
    
}


const login=async(req,res)=>{
    try {
        
        const { email, password } = req.body;
        const { subscriptions, token } = await userService.logInUser(email, password);

       
        res.status(200).json({
          success: true,
          message: 'Login successful',
          token: token,
          subscriptions: subscriptions
        });
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message
        });
    }

}

const subscribe = async (req, res) => {
    try {
      const { userId } = req.user;
      const { ticker } = req.body;
      
      const subscriptions = await userService.subscribe(userId, ticker);
        
      res.json({ subscriptions });
    } catch (error) {
      if (error.message === 'Unsupported stock') {
        return res.status(400).json({ message: error.message });
      }
      if (error.message === 'User not found') {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: 'Error subscribing to stock' });
    }
  };

const getStocks = (req, res) => {
    res.json({ stocks: supportedStocks });
  };


module.exports={login,createUser,getStocks,subscribe}
