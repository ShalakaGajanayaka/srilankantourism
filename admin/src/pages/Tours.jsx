import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function Tours() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    duration: '',
    persons: '',
    price: '',
    originalPrice: '',
    rating: '',
    reviews: '',
    images: '',
    featured: false,
    category: 'cultural',
    available: true
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch tours
  const fetchTours = async () => {
    setLoading(true);
    try {
      // Use ?all=true to get all tours including unavailable ones
      const response = await fetch(`${API_URL}/tours?all=true`);
      const data = await response.json();
      if (data.success) {
        setTours(data.data);
      }
    } catch (err) {
      setError('Failed to fetch tours');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Process images - split by comma or newline
    const imagesArray = formData.images
      ? formData.images.split(/[,\n]/).map(img => img.trim()).filter(img => img)
      : [];

    // Prepare data
    const tourData = {
      name: formData.name,
      description: formData.description,
      location: formData.location,
      duration: formData.duration,
      persons: formData.persons,
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
      rating: formData.rating ? parseFloat(formData.rating) : 0,
      reviews: formData.reviews ? parseInt(formData.reviews) : 0,
      images: imagesArray,
      featured: formData.featured,
      category: formData.category,
      available: formData.available
    };

    try {
      const response = await fetch(`${API_URL}/tours`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tourData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess('Tour added successfully!');
        setFormData({
          name: '',
          description: '',
          location: '',
          duration: '',
          persons: '',
          price: '',
          originalPrice: '',
          rating: '',
          reviews: '',
          images: '',
          featured: false,
          category: 'cultural',
          available: true
        });
        setShowForm(false);
        fetchTours();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message || 'Failed to add tour');
      }
    } catch (err) {
      setError('Failed to add tour: ' + err.message);
    }
  };

  // Handle delete tour
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this tour?')) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/tours/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setSuccess('Tour deleted successfully!');
        fetchTours();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError('Failed to delete tour');
      }
    } catch (err) {
      setError('Failed to delete tour: ' + err.message);
    }
  };

  return (
    <div className="tours-page">
      <div className="tours-header">
        <div>
          <h2>Tours Management</h2>
          <p>Manage all tours in the system</p>
        </div>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? '✕ Cancel' : '+ Add New Tour'}
        </button>
      </div>

      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      {success && (
        <div className="alert alert-success">
          {success}
        </div>
      )}

      {showForm && (
        <div className="form-card">
          <h3>Add New Tour</h3>
          <form onSubmit={handleSubmit} className="tour-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Tour Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Sigiriya Rock Fortress Tour"
                />
              </div>

              <div className="form-group">
                <label htmlFor="location">Location *</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Sigiriya, Sri Lanka"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                placeholder="Enter tour description..."
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="duration">Duration *</label>
                <input
                  type="text"
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                  placeholder="e.g., 3 Days 2 Nights"
                />
              </div>

              <div className="form-group">
                <label htmlFor="persons">Persons *</label>
                <input
                  type="text"
                  id="persons"
                  name="persons"
                  value={formData.persons}
                  onChange={handleChange}
                  required
                  placeholder="e.g., 2 Person"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="price">Price (LKR) *</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                />
              </div>

              <div className="form-group">
                <label htmlFor="originalPrice">Original Price (LKR)</label>
                <input
                  type="number"
                  id="originalPrice"
                  name="originalPrice"
                  value={formData.originalPrice}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  placeholder="0.00 (optional)"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="category">Category *</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="cultural">Cultural</option>
                  <option value="adventure">Adventure</option>
                  <option value="beach">Beach</option>
                  <option value="wildlife">Wildlife</option>
                  <option value="heritage">Heritage</option>
                  <option value="nature">Nature</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="rating">Rating (0-5)</label>
                <input
                  type="number"
                  id="rating"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  min="0"
                  max="5"
                  step="0.1"
                  placeholder="0.0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="reviews">Number of Reviews</label>
                <input
                  type="number"
                  id="reviews"
                  name="reviews"
                  value={formData.reviews}
                  onChange={handleChange}
                  min="0"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="images">Image URLs (one per line or comma separated)</label>
              <textarea
                id="images"
                name="images"
                value={formData.images}
                onChange={handleChange}
                rows="3"
                placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
              />
            </div>

            <div className="form-row-checkboxes">
              <div className="form-checkbox">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                />
                <label htmlFor="featured">Featured Tour</label>
              </div>

              <div className="form-checkbox">
                <input
                  type="checkbox"
                  id="available"
                  name="available"
                  checked={formData.available}
                  onChange={handleChange}
                />
                <label htmlFor="available">Available</label>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary">
                Add Tour
              </button>
              <button 
                type="button" 
                className="btn-secondary"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="tours-list">
        <div className="tours-list-header">
          <h3>All Tours ({tours.length})</h3>
        </div>

        {loading ? (
          <div className="loading">Loading tours...</div>
        ) : tours.length === 0 ? (
          <div className="empty-state">
            <p>No tours found. Add your first tour!</p>
          </div>
        ) : (
          <div className="tours-grid">
            {tours.map((tour) => (
              <div key={tour._id} className="tour-card">
                <div className="tour-card-image">
                  {tour.images && tour.images.length > 0 ? (
                    <img src={tour.images[0]} alt={tour.name} />
                  ) : (
                    <div className="tour-image-placeholder">No Image</div>
                  )}
                  {tour.featured && <span className="featured-badge">Featured</span>}
                  {!tour.available && <span className="unavailable-badge">Unavailable</span>}
                </div>
                <div className="tour-card-content">
                  <h4>{tour.name}</h4>
                  <p className="tour-location">📍 {tour.location}</p>
                  <p className="tour-duration">⏱️ {tour.duration} | 👥 {tour.persons}</p>
                  <p className="tour-description">{tour.description.substring(0, 100)}...</p>
                  <div className="tour-meta">
                    <span className="tour-category">{tour.category}</span>
                    {tour.rating > 0 && (
                      <span className="tour-rating">⭐ {tour.rating} ({tour.reviews})</span>
                    )}
                  </div>
                  <div className="tour-price">
                    <strong>LKR {tour.price.toLocaleString()}</strong>
                    {tour.originalPrice && tour.originalPrice > tour.price && (
                      <span className="original-price">LKR {tour.originalPrice.toLocaleString()}</span>
                    )}
                  </div>
                </div>
                <div className="tour-card-actions">
                  <button 
                    className="btn-danger btn-sm"
                    onClick={() => handleDelete(tour._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Tours;

