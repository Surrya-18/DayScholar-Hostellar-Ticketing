const express=require('express');
const app=express();
const mongoose=require('mongoose');
const cors = require('cors');

const authRoutes = require('../Backend/routes/auth');
const busRoutes = require("../Backend/routes/busRoutes");
const bookingRoutes = require("./routes/bookings");


app.use(cors());
app.use(express.json());
mongoose.connect("mongodb://localhost:27017/HostellarTicketing")
.then(()=>{
    console.log("Connected to MongoDB");
    
})

app.use('/api/auth', authRoutes);
app.use("/api/routes", busRoutes);
app.use("/api/bookings", bookingRoutes);

app.listen(5000,()=>{
    console.log("Connected to Port 5000");
    
})