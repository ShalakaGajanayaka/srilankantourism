import mongoose from 'mongoose';

const transportSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a transport name'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Please provide a location']
  },
  miles: {
    type: String
  },
  transmission: {
    type: String,
    enum: ['Automatic', 'Manual'],
    default: 'Automatic'
  },
  trips: {
    type: String
  },
  seats: {
    type: String,
    required: [true, 'Please provide number of seats']
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price']
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
  available: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Transport = mongoose.model('Transport', transportSchema);

export default Transport;

