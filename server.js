// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorMiddleware');
const jobRouter = require('./routes/jobRouter');
const messageRouter = require('./routes/messageRouter');
const companyRouter = require('./routes/companyRouter');
const userProfileRouter = require('./routes/userProfileRouter');
const skillRouter = require('./routes/skillRouter');
const experienceRouter = require('./routes/experienceRouter');
const applicationRouter = require('./routes/applicationRouter');
const savedJobRouter = require('./routes/savedJobRouter');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', userRoutes);
app.use('/api/jobs',jobRouter);
app.use('/api/messages',messageRouter)
app.use('/api/companies', companyRouter);
app.use('/api/profile', userProfileRouter);
app.use('/api/skill', skillRouter);
app.use('/api/experience', experienceRouter);
app.use('/api/applications', applicationRouter);
app.use('/api/savedJob', savedJobRouter);


app.get('/', (req, res) => {
  res.send('Backend is running');
});




// Error Middleware
app.use(errorHandler);

module.exports = app;
