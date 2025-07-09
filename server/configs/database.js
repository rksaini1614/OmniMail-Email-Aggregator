
const moongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


const connectDB = async () => {
    try{
        await moongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully');
    }
    catch(error){
        console.error(`Error connecting to the database: ${error.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;