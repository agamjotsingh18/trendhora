import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Chip,
  Box,
  Rating,
  Skeleton
} from '@mui/material';
import {
  FavoriteBorder,
  Favorite,
  ShoppingCart,
  Visibility
} from '@mui/icons-material';
import './RelatedCard.css';
import { WishItemsContext } from '../../../Context/WishItemsContext';
import { success as toastSuccess } from '../../../lib/toast';

const RelatedCard = ({ item }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const wishItems = useContext(WishItemsContext);

  useEffect(() => {
    const exists = wishItems.items?.some(i => i._id === item._id);
    setIsWishlisted(!!exists);
  }, [wishItems.items, item._id]);
  const [showActions, setShowActions] = useState(false);

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const res = wishItems.toggleItem(item);
    if (res === 'added') {
      toastSuccess('Item added to wishlist!');
      setIsWishlisted(true);
    } else {
      toastSuccess('Item removed from wishlist');
      setIsWishlisted(false);
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Add to cart logic here
    console.log('Added to cart:', item.name);
  };

  const isOnSale = item.originalPrice && item.originalPrice > item.price;
  const isNew = item.isNew;
  const discountPercentage = isOnSale 
    ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
    : 0;

  return (
    <Card 
      className="enterprise-related-card"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        borderRadius: '16px',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        backgroundColor: 'var(--bg-primary)',
        border: '1px solid var(--border-color)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 32px rgba(0, 0, 0, 0.15)',
          borderColor: 'var(--accent-color)',
        }
      }}
    >
      {/* Badges */}
      {isOnSale && (
        <Chip
          label={`-${discountPercentage}%`}
          size="small"
          className="sale-badge"
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            zIndex: 2,
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            color: 'white',
            fontWeight: 700,
            fontSize: '0.75rem'
          }}
        />
      )}
      
      {isNew && (
        <Chip
          label="NEW"
          size="small"
          className="new-badge"
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            zIndex: 2,
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: 'white',
            fontWeight: 700,
            fontSize: '0.75rem'
          }}
        />
      )}

      {/* Image Container */}
      <Box className="card-image-container" sx={{ position: 'relative', height: 250 }}>
        {!imageLoaded && (
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
            className="image-skeleton"
            animation="wave"
          />
        )}
        
        <CardMedia
          component="img"
          height="250"
          image={`${process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'}/public/${item.category}/${item.image?.[0]?.filename || 'placeholder.jpg'}`}
          alt={item.name || 'Product'}
          className="card-image"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(true)}
          sx={{
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
            display: imageLoaded ? 'block' : 'none'
          }}
        />

        {/* Hover Overlay with Actions */}
        <Box 
          className={`card-overlay ${showActions ? 'visible' : ''}`}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: showActions ? 1 : 0,
            transition: 'opacity 0.3s ease',
            backdropFilter: 'blur(2px)'
          }}
        >
          <Box className="overlay-actions" sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              className="action-button"
              onClick={handleWishlistToggle}
              size="small"
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                color: '#374151',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 1)',
                  transform: 'scale(1.1)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                }
              }}
            >
              {isWishlisted ? 
                <Favorite sx={{ color: '#ef4444', fontSize: 20 }} /> : 
                <FavoriteBorder sx={{ fontSize: 20 }} />
              }
            </IconButton>
            
            <IconButton
              className="action-button"
              onClick={handleAddToCart}
              size="small"
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                color: '#374151',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 1)',
                  transform: 'scale(1.1)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                }
              }}
            >
              <ShoppingCart sx={{ fontSize: 20 }} />
            </IconButton>
            
            <IconButton
              component={Link}
              to={`/item/${item.category}/${item._id}`}
              className="action-button"
              size="small"
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                color: '#374151',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 1)',
                  transform: 'scale(1.1)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                }
              }}
            >
              <Visibility sx={{ fontSize: 20 }} />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* Card Content */}
      <CardContent 
        className="card-content"
        sx={{
          padding: '1.25rem',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: 'var(--bg-primary)'
        }}
      >
        <Link 
          to={`/item/${item.category}/${item._id}`} 
          className="product-link"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <Typography
            variant="h6"
            className="product-name"
            sx={{
              fontWeight: 600,
              fontSize: '1rem',
              lineHeight: 1.3,
              marginBottom: '0.5rem',
              color: 'var(--text-primary)',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              transition: 'color 0.2s ease',
              '&:hover': {
                color: 'var(--accent-color)'
              }
            }}
          >
            {item.name || 'Product Name'}
          </Typography>
        </Link>

        <Typography
          variant="body2"
          className="product-description"
          sx={{
            fontSize: '0.875rem',
            lineHeight: 1.4,
            marginBottom: '0.75rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            color: 'var(--text-secondary)'
          }}
        >
          {item.description || 'Product description goes here...'}
        </Typography>

        {/* Rating */}
        <Box className="rating-container" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Rating
            value={item.rating || 4.2}
            precision={0.1}
            readOnly
            size="small"
            className="product-rating"
            sx={{
              '& .MuiRating-iconFilled': {
                color: 'var(--accent-color)'
              }
            }}
          />
          <Typography variant="caption" sx={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
            ({item.reviewCount || '42'})
          </Typography>
        </Box>

        {/* Price */}
        <Box className="price-container" sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 'auto' }}>
          <Typography
            variant="h6"
            className="current-price"
            sx={{
              fontWeight: 700,
              color: 'var(--text-primary)',
              fontSize: '1.125rem'
            }}
          >
            ${item.price || '0'}
          </Typography>
          
          {isOnSale && (
            <Typography
              variant="body2"
              className="original-price"
              sx={{
                color: 'var(--text-secondary)',
                textDecoration: 'line-through',
                fontSize: '0.875rem'
              }}
            >
              ${item.originalPrice}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default RelatedCard;