import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a hotel name'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a description']
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
  amenities: [{
    type: String
  }],
  roomTypes: [{
    type: {
      type: String
    },
    price: Number,
    available: {
      type: Boolean,
      default: true
    }
  }],
  featured: {
    type: Boolean,
    default: false
  },
  available: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Hotel = mongoose.model('Hotel', hotelSchema);

export default Hotel;

