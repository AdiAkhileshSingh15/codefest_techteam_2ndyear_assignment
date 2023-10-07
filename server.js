const express = require('express');
const cors = require('cors'); 
const app = express();
const port = process.env.PORT || 3000;
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS for development (allow requests from your React app)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Update with your React app's URL
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is up and running!' });
});

// Sign-up route
app.post('/api/signup', (req, res) => {
    // Extract user data from the request body
    const { email, password } = req.body;
    res.json({ message: 'Sign-up successful' });
});

// Sign-up route (for handling POST requests)
app.post('/api/signup', (req, res) => {
  // Extract user data from the request body
  const { email, password } = req.body;
  res.json({ message: 'Sign-up successful' });
});

// GET route for /api/signup
app.get('/api/signup', (req, res) => {
  res.json({ message: 'This is the sign-up page' });
});


// Serve static files from a directory (e.g., public)
app.use(express.static('public'));

// Route for serving the signup page
app.get('/signup', (req, res) => {
  res.sendFile('public/signup.html', { root: __dirname });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
