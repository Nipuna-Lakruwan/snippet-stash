const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// CRITICAL: We use 'process.env.MONGO_URI' so Docker can tell us where the DB is.
// If that environment variable is missing, it falls back to localhost.
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/snippetstash';

mongoose.connect(mongoUri)
  .then(() => console.log('MongoDB Connected 🚀'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// Database Schema
const SnippetSchema = new mongoose.Schema({
  title: String,
  code: String
});
const Snippet = mongoose.model('Snippet', SnippetSchema);

// API Routes
app.get('/snippets', async (req, res) => {
  const snippets = await Snippet.find();
  res.json(snippets);
});

app.post('/snippets', async (req, res) => {
  const newSnippet = new Snippet(req.body);
  await newSnippet.save();
  res.json(newSnippet);
});

app.listen(5000, () => {
  console.log('Backend server running on port 5000');
});