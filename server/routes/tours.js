import express from 'express';
import Tour from '../models/Tour.js';

const router = express.Router();

// @route   GET /api/tours
// @desc    Get all tours (with optional query for admin)
// @access  Public (admin can use ?all=true to get all tours)
router.get('/', async (req, res) => {
  try {
    const query = req.query.all === 'true' ? {} : { available: true };
    const tours = await Tour.find(query).sort({ createdAt: -1 });
    res.json({
      success: true,
      count: tours.length,
      data: tours
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/tours/:id
// @desc    Get single tour
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    
    if (!tour) {
      return res.status(404).json({ message: 'Tour not found' });
    }
    
    res.json({
      success: true,
      data: tour
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/tours
// @desc    Create a tour
// @access  Private/Admin
router.post('/', async (req, res) => {
  try {
    const tour = await Tour.create(req.body);
    res.status(201).json({
      success: true,
      data: tour
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   DELETE /api/tours/:id
// @desc    Delete a tour
// @access  Private/Admin
router.delete('/:id', async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    
    if (!tour) {
      return res.status(404).json({ message: 'Tour not found' });
    }
    
    res.json({
      success: true,
      message: 'Tour deleted successfully',
      data: tour
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;

