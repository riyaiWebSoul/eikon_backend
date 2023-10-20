const express = require("express");
const cors = require('cors');
require('dotenv').config();
const app = express();
const connectDB = require("./config/db");
const HomeRouter = require('./routes/api/home');
const productRouter = require('./routes/api/product');
const ContactRouter = require('./routes/api/contact');

// const userRouter = require('./routes/api/users');
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
// Connect database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send(" hello this is demo API  Running"));

// Define Routes
app.use(cors());
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));
app.use('/imageUploads', express.static('public/images'));
app.use('/products', productRouter.router);
// app.use('/user', userRouter.router);
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
app.use('/images', express.static('public/images'));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () =>
  console.log(`🏎  ✔ app started on port ${PORT} (/app.js)`)
);
