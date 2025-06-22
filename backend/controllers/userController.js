import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
const userregister = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const exists = await userModel.findOne({ email: email });
    if (exists) {
      return res.json({ success: false, message: 'User already exists' });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Please enter strong password" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    await newUser.save();
    return res.json({ success: true, message: "User registered successfully" });

  } catch (err) {
    console.error(err);
    return res.json({ success: false, message: "Something went wrong" });
  }
};

const login = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Password" });
    }

    const token = jwt.sign({ userId: user._id }, "secret123");

    return res.json({ success: true, token: token , message : "Login in successfully"});
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};


const profile = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.json({
      success: true,
      data: {
        name: user.name,
        email: user.email,
        cartData: user.cartData, // optional
        // don't send password or sensitive info
      },
    });
  } catch (err) {
    console.error("Profile error:", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
export { userregister ,profile ,  login };
