const express = require("express");
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();
const path = require("path");
const app = express();
const connectDB = require("./config/db");
const HomeRouter = require('./routes/api/home');
const productRouter = require('./routes/api/product');
const ContactRouter = require('./routes/api/contact');
const publicDirectory = path.join(__dirname, "public");
const AboutRouter = require('./routes/api/about');
const AppointmentRouter = require('./routes/api/appointment');
const MedicalRouter = require('./routes/api/medical');
const MapingEcommerceRouter = require('./routes/api/MapingEcommerce');
const FooterRouter = require('./routes/api/footer');
const EnquiryRouter = require('./routes/api/enquiry');
const HealingTouch = require('./routes/api/healingTouch');
const PatientReview = require('./routes/api/PatientReview');
const DrList = require('./routes/api/drList');
const LoginIdRouter = require('./routes/api/loginId');
const ImageUploadRouter = require('./routes/api/imagesUpload');

// Connect to the database
connectDB();

// Define storage for uploaded images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images'); // Images will be stored in the 'public/images' directory
  },
  filename: (req, file, cb) => {
    // Generate a unique filename for each uploaded image
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Create the multer instance with the defined storage
const upload = multer({ storage });

// Serve static files from the "public" directory
app.use(express.static(publicDirectory));

// Enable JSON parsing for incoming requests
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Define a simple root route
app.get("/", (req, res) => res.send("Hello, this is a demo API running"));

// Define a route for uploading images
app.post('/imageUpload', upload.single('image'), (req, res) => {
  // Handle the uploaded file here
  res.send('File uploaded successfully');
});

// Define other API routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

// Serve uploaded images statically
app.use('/imageUploads', express.static('public/images'));

// Include other API routes
app.use('/products', productRouter.router);
app.use('/about', AboutRouter.router);
app.use('/home', HomeRouter.router);
app.use('/appointments', AppointmentRouter.router);
app.use('/medical', MedicalRouter.router);
app.use('/MapingEcommerce', MapingEcommerceRouter.router);
app.use('/footer', FooterRouter.router);
app.use('/contact', ContactRouter.router);
app.use('/enquiry', EnquiryRouter.router);
app.use('/healingTouch', HealingTouch.router);
app.use('/PatientReview', PatientReview.router);
app.use('/drList', DrList.router);
app.use('/imageUpload', ImageUploadRouter.router);
app.use('/loginId', LoginIdRouter.router);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () =>
  console.log(`🚀  ✔ App started on port ${PORT} (/app.js)`)
);
