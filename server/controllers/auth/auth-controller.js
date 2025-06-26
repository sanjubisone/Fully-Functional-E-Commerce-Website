const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/user'); // Adjust the path as necessary

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {

        // Validate input
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required', success: false });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists', success: false });
        }

        const hashpassword = await bcrypt.hash(password, 12)

        // Create new user
        const newUser = new User({ username, email, password: hashpassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully', success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', success: false });
    }

}


const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'user does not exist please register first', success: false });
        }

        // Check password (assuming you have a method to compare passwords)
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'incorrect password plese try again', success: false });
        }

        // Generate token (assuming you have a method to generate tokens)
        const token = jwt.sign({
            id: user._id, role: user.role, email: user.email, userName : user.username,
        }, 'CLIENT_SECRET_KEY', { expiresIn: '60m' })

        res.cookie('token', token, { httpOnly: true, secure: false })

        res.status(200).json({
            success: true,
            message: 'loged in successfully',
            user: {
                email: user.email,
                role: user.role,
                id: user._id,
                 userName : user.username,
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', success: false });
    }
};

const logoutUser=(req ,res)=>{
res.clearCookie('token').json({
    success : true,
    message : 'successfilly logout'
})
}

const authMiddleware=async(req,res,next)=>{
       console.log('decoded use')
    const token=req.cookies.token;
    if(!token){
        return res.status(401).json({
            success : false,
            message : 'unauthorised user'
        })

    }


    try{
        const decoded=jwt.verify(token , 'CLIENT_SECRET_KEY') 
        console.log('decoded use',decoded)
        req.user=decoded
        next()

    } catch(error){
  res.status(401).json({
            success : false,
            message : 'unauthorised user'
        })
    }
}


module.exports = { registerUser ,loginUser , logoutUser , authMiddleware };