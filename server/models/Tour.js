import mongoose from 'mongoose';

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a tour name'],
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
  duration: {
    type: String,
    required: [true, 'Please provide duration']
  },
  persons: {
    type: String,
    required: [true, 'Please provide number of persons']
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
  featured: {
    type: Boolean,
    default: false
  },
  category: {
    type: String,
    enum: ['adventure', 'cultural', 'beach', 'wildlife', 'heritage', 'nature'],
    default: 'cultural'
  },
  available: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Tour = mongoose.model('Tour', tourSchema);

export default Tour;

