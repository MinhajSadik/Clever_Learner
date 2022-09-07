import cloudinary from "cloudinary";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import fileUpload from "express-fileupload";
import morgan from "morgan";
import connectDB from "./DB/mdb.js";
import errorMiddleware from "./middlewares/errors.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors({ origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true }));

app.all("/", (req, res) => {
  console.log("Hello clever learner console viewer");
  res.status(200).send("Hello clever learner API viewer");
});

//database init
connectDB();

//cludinary init
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

//route init
import questionRoute from "./routes/questionRoute.js";
import quizRoute from "./routes/quizRoute.js";
import userRoute from "./routes/userRoute.js";
app.use("/api/user", userRoute);
app.use("/api/quiz", quizRoute);
app.use("/api/question", questionRoute);

//default middleware
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
