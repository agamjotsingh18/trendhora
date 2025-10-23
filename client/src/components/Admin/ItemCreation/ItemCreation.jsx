import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Box,
  Alert,
  CircularProgress,
  IconButton,
  InputAdornment
} from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import './ItemCreation.css';

const ItemCreation = () => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });
  
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    type: '',
    color: '',
    description: '',
    price: '',
    detail: '',
    stock: 0,
    lowStockThreshold: 5,
    highlights: [],
    size: [],
    images: []
  });

  const [highlightInput, setHighlightInput] = useState('');
  const [sizeInput, setSizeInput] = useState('');

  const categories = ['Men', 'Women', 'Kids', 'Accessories', 'Footwear'];
  const types = ['T-Shirt', 'Jeans', 'Shirt', 'Dress', 'Shoes', 'Jacket', 'Shorts', 'Skirt', 'Sweater', 'Other'];
  const colors = ['Black', 'White', 'Blue', 'Red', 'Green', 'Yellow', 'Pink', 'Grey', 'Brown', 'Purple', 'Orange'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

  const showAlert = (type, message) => {
    setAlert({ show: true, type, message });
    setTimeout(() => setAlert({ show: false, type: '', message: '' }), 5000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddHighlight = () => {
    if (highlightInput.trim()) {
      setFormData(prev => ({
        ...prev,
        highlights: [...prev.highlights, highlightInput.trim()]
      }));
      setHighlightInput('');
    }
  };

  const handleRemoveHighlight = (index) => {
    setFormData(prev => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index)
    }));
  };

  const handleAddSize = (size) => {
    if (!formData.size.includes(size)) {
      setFormData(prev => ({
        ...prev,
        size: [...prev.size, size]
      }));
    }
  };

  const handleAddCustomSize = () => {
    if (sizeInput.trim() && !formData.size.includes(sizeInput.trim())) {
      setFormData(prev => ({
        ...prev,
        size: [...prev.size, sizeInput.trim()]
      }));
      setSizeInput('');
    }
  };

  const handleRemoveSize = (sizeToRemove) => {
    setFormData(prev => ({
      ...prev,
      size: prev.size.filter(s => s !== sizeToRemove)
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + formData.images.length > 5) {
      showAlert('error', 'Maximum 5 images allowed');
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));
  };

  const handleRemoveImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      showAlert('error', 'Product name is required');
      return false;
    }
    if (!formData.category) {
      showAlert('error', 'Category is required');
      return false;
    }
    if (!formData.type) {
      showAlert('error', 'Product type is required');
      return false;
    }
    if (!formData.color) {
      showAlert('error', 'Color is required');
      return false;
    }
    if (!formData.description.trim()) {
      showAlert('error', 'Description is required');
      return false;
    }
    if (!formData.price || formData.price <= 0) {
      showAlert('error', 'Valid price is required');
      return false;
    }
    if (!formData.detail.trim()) {
      showAlert('error', 'Product details are required');
      return false;
    }
    if (formData.highlights.length === 0) {
      showAlert('error', 'At least one highlight is required');
      return false;
    }
    if (formData.size.length === 0) {
      showAlert('error', 'At least one size is required');
      return false;
    }
    if (formData.images.length === 0) {
      showAlert('error', 'At least one image is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const submitData = new FormData();

      // Append all text fields
      submitData.append('name', formData.name);
      submitData.append('category', formData.category);
      submitData.append('type', formData.type);
      submitData.append('color', formData.color);
      submitData.append('description', formData.description);
      submitData.append('price', formData.price);
      submitData.append('detail', formData.detail);
      submitData.append('stock', formData.stock);
      submitData.append('lowStockThreshold', formData.lowStockThreshold);
      submitData.append('highlights', formData.highlights.join(','));
      submitData.append('size', formData.size.join(','));

      // Append images (must use 'images' to match backend multer field name)
      formData.images.forEach((image) => {
        submitData.append('images', image);
      });

      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/items`,
        submitData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      showAlert('success', 'Product created successfully!');
      
      // Reset form
      setFormData({
        name: '',
        category: '',
        type: '',
        color: '',
        description: '',
        price: '',
        detail: '',
        stock: 0,
        lowStockThreshold: 5,
        highlights: [],
        size: [],
        images: []
      });
    } catch (error) {
      console.error('Error creating item:', error);
      showAlert('error', error.response?.data?.message || 'Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" className="item-creation-container">
      <Paper elevation={3} className="item-creation-paper">
        <Typography variant="h4" className="item-creation-title">
          Create New Product
        </Typography>
        
        {alert.show && (
          <Alert severity={alert.type} className="item-creation-alert">
            {alert.message}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Basic Information */}
            <Grid item xs={12}>
              <Typography variant="h6" className="section-title">
                Basic Information
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Product Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="e.g., Cotton Casual T-Shirt"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  label="Category"
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Type</InputLabel>
                <Select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  label="Type"
                >
                  {types.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Color</InputLabel>
                <Select
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  label="Color"
                >
                  {colors.map((color) => (
                    <MenuItem key={color} value={color}>
                      {color}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                multiline
                rows={3}
                required
                placeholder="Brief description of the product"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Detailed Information"
                name="detail"
                value={formData.detail}
                onChange={handleInputChange}
                multiline
                rows={4}
                required
                placeholder="Detailed product information, materials, care instructions, etc."
              />
            </Grid>

            {/* Pricing & Stock */}
            <Grid item xs={12}>
              <Typography variant="h6" className="section-title">
                Pricing & Inventory
              </Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleInputChange}
                required
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Stock Quantity"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleInputChange}
                inputProps={{ min: 0 }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Low Stock Threshold"
                name="lowStockThreshold"
                type="number"
                value={formData.lowStockThreshold}
                onChange={handleInputChange}
                inputProps={{ min: 1 }}
              />
            </Grid>

            {/* Sizes */}
            <Grid item xs={12}>
              <Typography variant="h6" className="section-title">
                Available Sizes
              </Typography>
              <Box className="size-selector">
                {sizes.map((size) => (
                  <Chip
                    key={size}
                    label={size}
                    onClick={() => handleAddSize(size)}
                    color={formData.size.includes(size) ? 'primary' : 'default'}
                    className="size-chip"
                  />
                ))}
              </Box>
              <Box className="custom-size-input">
                <TextField
                  size="small"
                  label="Custom Size"
                  value={sizeInput}
                  onChange={(e) => setSizeInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCustomSize())}
                  placeholder="e.g., 42, Free Size"
                />
                <Button
                  variant="outlined"
                  onClick={handleAddCustomSize}
                  startIcon={<AddIcon />}
                >
                  Add
                </Button>
              </Box>
              <Box className="selected-sizes">
                {formData.size.map((size, index) => (
                  <Chip
                    key={index}
                    label={size}
                    onDelete={() => handleRemoveSize(size)}
                    color="primary"
                    className="selected-size-chip"
                  />
                ))}
              </Box>
            </Grid>

            {/* Highlights */}
            <Grid item xs={12}>
              <Typography variant="h6" className="section-title">
                Product Highlights
              </Typography>
              <Box className="highlight-input">
                <TextField
                  fullWidth
                  size="small"
                  label="Add Highlight"
                  value={highlightInput}
                  onChange={(e) => setHighlightInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddHighlight())}
                  placeholder="e.g., 100% Cotton, Machine Washable"
                />
                <Button
                  variant="outlined"
                  onClick={handleAddHighlight}
                  startIcon={<AddIcon />}
                >
                  Add
                </Button>
              </Box>
              <Box className="highlights-list">
                {formData.highlights.map((highlight, index) => (
                  <Chip
                    key={index}
                    label={highlight}
                    onDelete={() => handleRemoveHighlight(index)}
                    color="secondary"
                    className="highlight-chip"
                  />
                ))}
              </Box>
            </Grid>

            {/* Images */}
            <Grid item xs={12}>
              <Typography variant="h6" className="section-title">
                Product Images (Max 5)
              </Typography>
              <Box className="image-upload-section">
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<AddPhotoAlternateIcon />}
                  disabled={formData.images.length >= 5}
                >
                  Upload Images
                  <input
                    type="file"
                    hidden
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </Button>
                <Typography variant="caption" color="textSecondary">
                  {formData.images.length}/5 images uploaded
                </Typography>
              </Box>
              <Grid container spacing={2} className="image-preview-grid">
                {formData.images.map((image, index) => (
                  <Grid item xs={6} sm={4} md={2} key={index}>
                    <Box className="image-preview">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Preview ${index + 1}`}
                        className="preview-img"
                      />
                      <IconButton
                        className="delete-image-btn"
                        onClick={() => handleRemoveImage(index)}
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Box className="submit-section">
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} /> : null}
                >
                  {loading ? 'Creating Product...' : 'Create Product'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default ItemCreation;
