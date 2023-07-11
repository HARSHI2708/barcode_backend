const express = require('express');
const mongoose = require('mongoose');
const recordRouter = require('./routes/records');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://patil:0987654321@cluster0.ellsl9j.mongodb.net/Barcode?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });

// Routes
app.use('/records', recordRouter);
