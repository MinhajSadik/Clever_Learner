import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";

//using object for user controller instance
const userController = {
  registerUser: async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
      if (!name || !email || !password) {
        return next(
          new ErrorHandler("Please provide name, email & password", 400)
        );
      }
      const user = await UserModel.findOne({ email });
      if (user) {
        return next(
          new ErrorHandler(`User with Email: ${email} already exists`, 401)
        );
      }

      const newUser = await UserModel.create({
        name,
        email,
        password,
      });

      const token = jwt.sign(
        {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRE,
        }
      );

      res.cookie("token", token, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
      });


      return res.status(201).send({
        status: true,
        user: newUser,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  },

  loginUser: async (req, res, next) => {
    const { email, password } = req.body;
    try {
      if (!email || !password) {
        return next(new ErrorHandler("Please provide email and password", 400));
      }

      const user = await UserModel.findOne({ email }).select("+password");
      if (!user) {
        return next(
          new ErrorHandler(
            `User with Email: ${email} not found, create with same Email`,
            404
          )
        );
      }

      const isPasswordMatch = await user.comparePassword(password);
      if (!isPasswordMatch) {
        return next(new ErrorHandler("Password is not matched", 401));
      }

      const token = jwt.sign(
        {
          id: user._id,
          name: user.name,
          email: user.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_COOKIE_EXPIRES_IN,
        }
      );


      res.cookie("token", token, {
        maxAge: 1000 * 60 * 60 * 24 * 3,
        httpOnly: true,
        sameSite: "none",
        secure: true
      });


      return res.status(200).json({
        status: true,
        user,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  },
};

export default userController;
