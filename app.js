import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { CORS_ORIGIN } from './constant.js';
console.log('fasd',process.env.PORT);

// Define the schema
const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  descriptionList: {
    type: [String],
    required: true
  }
});

// Create the model
export const Model = mongoose.model('Item', schema);

// Initialize the app
const app = express();
console.log(process.env.CORS_ORIGIN);
app.use(cors({
  origin: CORS_ORIGIN,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get('/api/v1/test', (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server running"
  });
});

// Route to get all items
app.get('/api/v1/items', async (req, res) => {
  try {
    const items = await Model.find();
    res.status(200).json({
      success: true,
      data: items
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Route to create a new item
app.post('/api/v1/items', async (req, res) => {
  try {
    const newItem = new Model(req.body);
    await newItem.save();
    res.status(201).json({
      success: true,
      data: newItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Route to update an item
app.put('/api/v1/items/:id', async (req, res) => {
  try {
    const updatedItem = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({
      success: true,
      data: updatedItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Route to delete an item
app.delete('/api/v1/items/:id', async (req, res) => {
  try {
    await Model.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Item deleted"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default app;
