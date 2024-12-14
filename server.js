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



// Error Middleware
app.use(errorHandler);

// Define the PORT
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
