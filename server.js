const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://vivek:bhatt@cluster0.pa9elm0.mongodb.net/data?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Import and use the user route
// const userRoutes = require('./routes/user.route');
const userRoutes = require ('./Routes/UserRoutes.js')
app.use('/user', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('Database connected to mongoDB')
});
