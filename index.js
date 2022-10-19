const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const accessRoute = require("./routes/access");
const movieRoute = require("./routes/movie");
const theatreRoute = require("./routes/theatre");
const adminRoute = require("./routes/admin");
//middleware
dotenv.config();
const URL = `mongodb+srv://kaviya:${process.env.PASSWORD}@cluster0.8siu96s.mongodb.net/bookmyshow`;

const app = express();

//middlewares

app.use(express.json());
app.use(
  cors({
    orgin: "*",
    credentials: true,
  })
);

//routes
app.use("/api/access", accessRoute);
app.use("/api/movie", movieRoute);
app.use("/api/theatre", theatreRoute);
app.use("/api/admin", adminRoute);

//connect to db
mongoose
  .connect(URL)
  .then(() => console.log("Connected To Database"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running on port 5000");
});
