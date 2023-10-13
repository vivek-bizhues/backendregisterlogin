const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost/your-database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Import and use the user route
const userRoutes = require('./routes/user.route');
app.use('/user', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
