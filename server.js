const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db")

//load the env
dotenv.config();

// initialize the app
const app = express();

// connect DB
connectDB();

// middleware
app.use(express.json())
app.use(cors())

// routes
app.use("/api/users", require("./routes/user.routes"))

// start the PORT
const PORT = process.env.PORT || 5009;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});