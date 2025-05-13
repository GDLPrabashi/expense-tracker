const mongoose = require("mongoose");

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database connected");
    } catch (error) {
        console.log("Eroor connecting to MongoDB",error);
        process.exit(1);
        
    }
}

module.exports = connectDB