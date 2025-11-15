import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a restaurant name'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Please provide a location']
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price']
  },
  originalPrice: {
    type: Number
  },
  badge: {
    type: String,
    enum: ['Popular', 'New', 'Featured', 'Trending', 'Cozy', 'Recommend', 'Friendly', 'Luxury'],
    default: 'Popular'
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviews: {
    type: Number,
    default: 0
  },
  images: [{
    type: String
  }],
  cuisine: {
    type: String
  },
  available: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;

