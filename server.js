require("dotenv").config();
const cors = require('cors');
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const jobRoutes = require("./routes/job");

//create a server
const app = express();

app.use(cors());

app.use(express.json());

//connect to db
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Db connected!"))
    .catch((error) => console.log("Failed to connect", error));

//health api
app.get("/health", (req, res) => {
    res.json({
        service: "job listing server",
        status: "Active",
        time: new Date(),
    });
});

app.use("/api/v1/auth", authRoutes);
// localhost:3010/api/v1

app.use("/api/v1/job", jobRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});
