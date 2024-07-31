const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser'); 
const cors = require('cors'); // Import the cors package

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());

// Enable CORS for all origins
app.use(cors({
  origin: '*', // Allow all origins
  credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'default_secret', // Use env variable for security
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
  })
);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', taskRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
