const express = require("express");
const fs = require('fs');
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
app.use('/images', express.static('public/images'));
// Enable JSON parsing for incoming requests
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Define a simple root route
app.get('/imageUpload', (req, res) => {
  const imageDir = path.join(__dirname, 'public', 'images');

  // Use the 'fs' module to read the contents of the directory
  fs.readdir(imageDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading images directory' });
    }

    // Filter out only image files (you can adjust this filter as needed)
    const imageFiles = files.filter((file) => {
      const extname = path.extname(file);
      return ['.jpg', '.jpeg', '.png', '.gif'].includes(extname.toLowerCase());
    });

    // Create an array of image URLs
    const imageUrls = imageFiles.map((file) => `/${file}`);

    res.json({ images: imageUrls });
  });
});

app.get('/api/imageNames', (req, res) => {
  const imagePath = 'public/images';
  fs.readdir(imagePath, (err, files) => {
    if (err) {
      console.error('Error reading the directory:', err);
      res.status(500).json({ error: 'Error reading directory' });
      return;
    }

    const imageFiles = files.filter(file => {
      const extension = file.split('.').pop().toLowerCase();
      return extension === 'jpg' || extension === 'png';
    });

    res.json(imageFiles);
  });
});

// Define a route for uploading images
app.post('/imageUploads', upload.single('image'), (req, res) => {
  // Handle the uploaded file here
  res.send('File uploaded successfully');
});
app.delete('/api/deleteImage/', (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, 'public', 'images', imageName);

  // Check if the image file exists
  if (fs.existsSync(imagePath)) {
    // Delete the image file
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error('Error deleting image:', err);
        res.status(500).json({ error: 'Error deleting image' });
      } else {
        console.log('Image deleted:', imageName);
        res.json({ message: 'Image deleted successfully' });
      }
    });
  } else {
    res.status(404).json({ error: 'Image not found' });
  }
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
