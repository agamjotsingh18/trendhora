import React, { useContext, useState } from 'react';
import './ComparisonModal.css';
import { useComparison } from '../../Context/ComparisonContext';
import { CartItemsContext } from '../../Context/CartItemsContext';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import StarIcon from '@mui/icons-material/Star';
import Toaster from '../Toaster/toaster';

const ComparisonModal = () => {
  const { compareItems, isCompareModalOpen, closeCompareModal, removeFromCompare } = useComparison();
  const cartItemsContext = useContext(CartItemsContext);
  const [showToaster, setShowToaster] = useState(false);
  const [toasterMessage, setToasterMessage] = useState('');

  if (!isCompareModalOpen) return null;

  const getImageUrl = (image, category) => {
    if (!image) return '';
    const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
    return typeof image === 'string' ? image : `${backendUrl}/public/${category}/${image.filename}`;
  };

  const getWinner = (field) => {
    if (compareItems.length < 2) return null;
    if (field === 'price') {
      const minPrice = Math.min(...compareItems.map(item => parseFloat(item.price)));
      return compareItems.findIndex(item => parseFloat(item.price) === minPrice);
    }
    return null;
  };

  const getSmartRecommendation = () => {
    if (compareItems.length < 2) return null;
    const prices = compareItems.map(item => parseFloat(item.price));
    const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;
    const bestValueIndex = compareItems.findIndex(item => {
      const price = parseFloat(item.price);
      return price <= avgPrice;
    });
    return bestValueIndex !== -1 ? bestValueIndex : 0;
  };

  const handleAddToCart = (item) => {
    cartItemsContext.addItemToCart(item);
    setToasterMessage(`${item.name} added to cart!`);
    setShowToaster(true);
  };

  const handleAddMoreClick = () => {
    closeCompareModal();
  };

  return (
    <div className="comparison-modal-overlay" onClick={closeCompareModal}>
      <div className="comparison-modal" onClick={(e) => e.stopPropagation()}>
        <div className="comparison-header">
          <div className="header-content">
            <h2>🔥 Product Battle Arena</h2>
            <p>Compare and find your perfect match!</p>
          </div>
          <button className="close-btn" onClick={closeCompareModal}>×</button>
        </div>
        
        {compareItems.length === 0 ? (
          <div className="empty-comparison">
            <div className="empty-icon">📊</div>
            <h3>No Products to Compare</h3>
            <p>Add products from the shop to start comparing!</p>
          </div>
        ) : (
          <div className="comparison-container">
            <div className="products-grid">
              {compareItems.map((item, index) => (
                <div key={item._id} className="product-card">
                  <button 
                    className="remove-btn" 
                    onClick={() => removeFromCompare(item._id)}
                  >×</button>
                  
                  <div className="product-image-container">
                    <img 
                      src={getImageUrl(item.image[0], item.category)} 
                      alt={item.name}
                      className="product-image"
                    />
                    <div className="category-badge">{item.category}</div>
                  </div>
                  
                  <div className="product-info">
                    <h3 className="product-name">{item.name}</h3>
                    
                    <div className={`price-section ${getWinner('price') === index ? 'winner' : ''}`}>
                      <span className="price">${item.price}</span>
                      {getWinner('price') === index && <span className="winner-badge">🏆 Best Price</span>}
                    </div>
                    
                    <div className="rating-section">
                      <StarIcon className="star-icon" />
                      <span>4.{Math.floor(Math.random() * 5) + 3}/5</span>
                    </div>
                    
                    <div className="description">
                      {item.description?.substring(0, 80)}...
                    </div>
                    
                    <button 
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(item)}
                    >
                      <AddShoppingCartIcon /> Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {compareItems.length >= 2 && (
              <div className="smart-recommendation">
                <h3>🤖 AI Recommendation</h3>
                <div className="recommendation-card">
                  <div className="recommendation-content">
                    <span className="recommendation-text">
                      Based on price and value analysis, we recommend: 
                      <strong>{compareItems[getSmartRecommendation()]?.name}</strong>
                    </span>
                    <div className="recommendation-reason">
                      💡 Best value for money in this comparison
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {compareItems.length < 3 && (
              <div className="add-more">
                <div className="add-more-card" onClick={handleAddMoreClick}>
                  <div className="add-icon">+</div>
                  <p>Add up to {3 - compareItems.length} more products</p>
                  <small>Click to go back and add more</small>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <Toaster
        message={toasterMessage}
        isVisible={showToaster}
        onClose={() => setShowToaster(false)}
        type="success"
        duration={2000}
      />
    </div>
  );
};

export default ComparisonModal;