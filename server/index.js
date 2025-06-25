const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const User = require('./router/user');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// API routes
app.use('/api', User);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const distPath = path.join(__dirname, '../client/dist');

if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));

  // Catch-all to serve index.html for client-side routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  console.warn('⚠️  client/dist not found. Frontend will not be served by backend.');
}

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
