import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import tourRoutes from './routes/tours.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Sri Lanka Tourism API',
    version: '1.0.0',
    status: 'Running',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      tours: '/api/tours'
    },
    documentation: 'API documentation coming soon...',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tours', tourRoutes);
// TODO: Add more routes
// app.use('/api/hotels', hotelRoutes);
// app.use('/api/transports', transportRoutes);
// app.use('/api/restaurants', restaurantRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Sri Lanka Tourism API is running',
    timestamp: new Date().toISOString()
  });
});

// MongoDB connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/srilanka-tourism', {
      // Remove deprecated options for newer mongoose versions
    });
    console.log('\n✅ ============================================');
    console.log('✅ MongoDB Connected Successfully!');
    console.log(`✅ Host: ${conn.connection.host}`);
    console.log(`✅ Database: ${conn.connection.name}`);
    console.log(`✅ Ready State: ${conn.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);
    console.log('✅ ============================================\n');
  } catch (error) {
    console.error('\n❌ ============================================');
    console.error('❌ MongoDB Connection Failed!');
    console.error(`❌ Error: ${error.message}`);
    console.error('❌ ============================================');
    console.error('⚠️  Server will continue running, but database features will not work.');
    console.error('💡 Make sure your IP is whitelisted in MongoDB Atlas:');
    console.error('   https://www.mongodb.com/docs/atlas/security-whitelist/\n');
    
    // In development, don't exit - allow server to run and retry connection
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    } else {
      // Retry connection after 5 seconds in development
      console.log('🔄 Retrying MongoDB connection in 5 seconds...\n');
      setTimeout(() => {
        connectDB();
      }, 5000);
    }
  }
};

// Connect to database
connectDB();

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!', 
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('\n🚀 ============================================');
  console.log('🚀 Server Started Successfully!');
  console.log(`🚀 Port: ${PORT}`);
  console.log(`🚀 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🚀 URL: http://localhost:${PORT}`);
  console.log('🚀 ============================================\n');
});

