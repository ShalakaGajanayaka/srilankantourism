import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

// Load environment variables
dotenv.config();

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/srilanka-tourism');
    console.log('✅ MongoDB Connected');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@sltours.com' });
    
    if (existingAdmin) {
      console.log('ℹ️  Admin user already exists');
      
      // Update password and role
      existingAdmin.password = 'adminsltours123';
      existingAdmin.role = 'admin';
      existingAdmin.isVerified = true;
      await existingAdmin.save(); // Password will be hashed by pre-save hook
      console.log('✅ Admin user password and role updated');
      console.log(`   Email: ${existingAdmin.email}`);
      console.log(`   Role: ${existingAdmin.role}`);
    } else {
      // Create admin user
      const admin = await User.create({
        name: 'Admin',
        email: 'admin@sltours.com',
        password: 'adminsltours123',
        role: 'admin',
        isVerified: true
      });
      console.log('✅ Admin user created successfully');
      console.log(`   Email: ${admin.email}`);
      console.log(`   Role: ${admin.role}`);
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();

