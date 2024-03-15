const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

// Middleware to parse JSON data
app.use(bodyParser.json());

// Enable CORS (Cross-Origin Resource Sharing)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Endpoint to handle comments submission
app.post('/comments', (req, res) => {
  const { name, comment } = req.body;
  
  // Read existing comments from the JSON file
  const comments = JSON.parse(fs.readFileSync('comments.json'));
  
  // Push the new comment to the array
  comments.push({ name, comment });
  
  // Write the updated comments array back to the file
  fs.writeFileSync('comments.json', JSON.stringify(comments));
  
  // Send a success response
  res.json({ success: true });
});

// Endpoint to get all comments
app.get('/comments', (req, res) => {
  // Read the comments from the JSON file
  const comments = JSON.parse(fs.readFileSync('comments.json'));

  // Send the comments as the response
  res.json(comments);
});

// Start the server
app.listen(3000, () => {
 console.log('Server started on port 3000');
});