const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const usersRoutes = require('./routes/usersRoutes');
const medicinesRoutes = require('./routes/medicinesRoutes');
const bodyTestRoutes = require('./routes/bodyTestRoutes');
const bookingRoutes = require('./routes/bookingRoutes')
const prescriptionRoutes = require('./routes/prescriptionRoutes')
const contactInquiryRoutes = require('./routes/contactInquiryRoutes')
const feedbackRoutes = require('./routes/feedbackRoutes')



require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

app.use(cors({
  origin: true,
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  exposedHeaders: 'Content-Length,X-Kuma-Revision',
  credentials: true,
  maxAge: 600
}));
const upload = multer();
app.use((req, res, next) => {
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/users', usersRoutes);
app.use('/api/medicines',medicinesRoutes)
app.use('/api/bodytest',bodyTestRoutes)
app.use('/api/book-appointment',bookingRoutes)
app.use('/api/prescription',prescriptionRoutes)
app.use('/api/contact-inquiry',contactInquiryRoutes)
app.use('/api/feedback',feedbackRoutes)




app.get('/', (req, res) => {
  res.send('api working!');
});

app.listen(port, () => {
  console.log(`Server running on ${process.env.NEXT_PUBLIC_API_URL}`);
});
