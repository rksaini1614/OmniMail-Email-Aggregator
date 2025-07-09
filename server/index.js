const express = require('express');
const connectDB = require('./configs/database');
const userRoutes = require("./routes/userRoutes");
const {cloudinaryConnect} = require('./configs/cloudinary');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const integrationRoutes = require('./routes/integrationRoutes');
dotenv.config();



const PORT = process.env.PORT || 4000;
const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads'
}));
app.use(cors(
    {
        origin: process.env.CLIENT_URL,
        credentials: true
    })
);


// Connect to the database
connectDB();

// Connect to Cloudinary
cloudinaryConnect();


// default route
app.get("/", (req, res) => {
    //const token = req.cookies.token;
  res.send("OnimMail Email Aggregator");
  
});

// to clear clerk cookies
app.get('/clear-clerk-cookies', (req, res) => {
  Object.keys(req.cookies).forEach(cookieName => {
    if (cookieName.startsWith('__clerk')) {
      res.clearCookie(cookieName, { path: '/' });
    }
  });
  res.send('Clerk cookies cleared');
});


// Routes
app.use('/api/v1/auth',userRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/integrations", integrationRoutes);


// Start the server
app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
});