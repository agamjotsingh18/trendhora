import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  CircularProgress,
  Tabs,
  Tab,
  Box,
  Typography
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import './InventoryManagement.css';

const InventoryManagement = () => {
  const [items, setItems] = useState([]);
  const [lowStockItems, setLowStockItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [stockValue, setStockValue] = useState(0);
  const [lowStockThreshold, setLowStockThreshold] = useState(5);
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    fetchItems();
    fetchLowStockItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/items`);
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
      showAlert('error', 'Failed to fetch items');
    } finally {
      setLoading(false);
    }
  };

  const fetchLowStockItems = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/items/low-stock`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setLowStockItems(response.data.items || []);
    } catch (error) {
      console.error('Error fetching low stock items:', error);
    }
  };

  const handleEditClick = (item) => {
    setSelectedItem(item);
    setStockValue(item.stock || 0);
    setLowStockThreshold(item.lowStockThreshold || 5);
    setEditDialogOpen(true);
  };

  const handleUpdateStock = async () => {
    if (!selectedItem) return;

    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/items/${selectedItem._id}/stock`,
        {
          stock: parseInt(stockValue),
          lowStockThreshold: parseInt(lowStockThreshold)
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      showAlert('success', 'Stock updated successfully');
      setEditDialogOpen(false);
      fetchItems();
      fetchLowStockItems();
    } catch (error) {
      console.error('Error updating stock:', error);
      showAlert('error', error.response?.data?.message || 'Failed to update stock');
    }
  };

  const showAlert = (type, message) => {
    setAlert({ show: true, type, message });
    setTimeout(() => setAlert({ show: false, type: '', message: '' }), 3000);
  };

  const getStockStatusChip = (item) => {
    const stockStatus = item.stockStatus || 'in_stock';
    const stock = item.stock || 0;

    if (stockStatus === 'out_of_stock' || stock === 0) {
      return <Chip icon={<ErrorIcon />} label="Out of Stock" color="error" size="small" />;
    } else if (stockStatus === 'low_stock') {
      return <Chip icon={<WarningIcon />} label="Low Stock" color="warning" size="small" />;
    } else {
      return <Chip icon={<CheckCircleIcon />} label="In Stock" color="success" size="small" />;
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const displayItems = tabValue === 0 ? items : lowStockItems;

  return (
    <div className="inventory-management-container">
      <div className="inventory-header">
        <Typography variant="h4" component="h1" gutterBottom>
          Inventory Management
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => { fetchItems(); fetchLowStockItems(); }}
        >
          Refresh
        </Button>
      </div>

      {alert.show && (
        <Alert severity={alert.type} onClose={() => setAlert({ show: false, type: '', message: '' })}>
          {alert.message}
        </Alert>
      )}

      <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: 2 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label={`All Items (${items.length})`} />
          <Tab label={`Low Stock Alerts (${lowStockItems.length})`} />
        </Tabs>
      </Box>

      {loading ? (
        <div className="loading-container">
          <CircularProgress />
        </div>
      ) : (
        <TableContainer component={Paper} className="inventory-table">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Image</strong></TableCell>
                <TableCell><strong>Product Name</strong></TableCell>
                <TableCell><strong>Category</strong></TableCell>
                <TableCell><strong>Price</strong></TableCell>
                <TableCell><strong>Stock</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Low Stock Alert</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayItems.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    {tabValue === 1 ? 'No low stock items' : 'No items found'}
                  </TableCell>
                </TableRow>
              ) : (
                displayItems.map((item) => (
                  <TableRow key={item._id} className={item.stock === 0 ? 'out-of-stock-row' : ''}>
                    <TableCell>
                      {item.image && item.image[0] && (
                        <img 
                          src={`${process.env.REACT_APP_BACKEND_URL}/${item.image[0]}`}
                          alt={item.name}
                          className="product-thumbnail"
                        />
                      )}
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>${item.price}</TableCell>
                    <TableCell>
                      <strong className={item.stock === 0 ? 'stock-zero' : ''}>
                        {item.stock || 0}
                      </strong>
                    </TableCell>
                    <TableCell>{getStockStatusChip(item)}</TableCell>
                    <TableCell>{item.lowStockThreshold || 5}</TableCell>
                    <TableCell>
                      <IconButton 
                        color="primary" 
                        onClick={() => handleEditClick(item)}
                        size="small"
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Edit Stock Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Update Stock - {selectedItem?.name}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Stock Quantity"
            type="number"
            fullWidth
            value={stockValue}
            onChange={(e) => setStockValue(e.target.value)}
            inputProps={{ min: 0 }}
          />
          <TextField
            margin="dense"
            label="Low Stock Threshold"
            type="number"
            fullWidth
            value={lowStockThreshold}
            onChange={(e) => setLowStockThreshold(e.target.value)}
            inputProps={{ min: 0 }}
            helperText="Alert when stock falls below this number"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleUpdateStock} variant="contained" color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default InventoryManagement;
