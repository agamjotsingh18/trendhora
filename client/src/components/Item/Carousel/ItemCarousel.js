
import Carousel from "react-bootstrap/Carousel";
import "./ItemCarousel.css";

const ProductCarousel = (props) => {
  return (
    <div className="product__carousel__container">
      <div className="product__carousel">
        <Carousel variant="dark" interval={4000}>
          <Carousel.Item>
            <div className="carousel__image__container">
              <img
                className="carousel__image"
                src={`https://trendhora-api.onrender.com/public/${props.item.category}/${props.item.image[0].filename}`}
                alt="item"
              />
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="carousel__image__container">
              <img
                className="carousel__image"
                src={`https://trendhora-api.onrender.com/public/${props.item.category}/${props.item.image[1].filename}`}
                alt="item"
              />
            </div>
          </Carousel.Item>
          {/* <Carousel.Item>
            <div className="carousel__image__container">
                <img className="carousel__image" src={`https://shema-backend.vercel.app/public/${props.item.category}/${props.item.image[2].filename}`} alt="item"/>
              </div>
            </Carousel.Item> */}
        </Carousel>
      </div>
    </div>
  );
};

export default ProductCarousel;

import React, { useState } from 'react';
import { IconButton, Chip } from '@mui/material';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import './ItemCarousel.css';

const ProductCarousel = (props) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const images = props.item.image || [];
    const totalImages = Math.max(images.length, 2);

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % totalImages);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
    };

    const goToImage = (index) => {
        setCurrentImageIndex(index);
    };

    const getImageUrl = (imageIndex) => {
        if (images[imageIndex]) {
            return `https://trendhora-api.onrender.com/public/${props.item.category}/${images[imageIndex].filename}`;
        }
        return '/placeholder-image.jpg'; // Add a placeholder image
    };

    const toggleZoom = () => {
        setIsZoomed(!isZoomed);
    };

    return (
        <div className="enterprise-carousel-container">
            {/* Main Image Display */}
            <div className="main-image-container">
                {!isImageLoaded && (
                    <div className="image-skeleton">
                        <div className="skeleton-shimmer"></div>
                    </div>
                )}
                
                <div className={`main-image-wrapper ${isZoomed ? 'zoomed' : ''}`}>
                    <img 
                        src={getImageUrl(currentImageIndex)}
                        alt={`${props.item.name} - View ${currentImageIndex + 1}`}
                        className="main-image"
                        onLoad={() => setIsImageLoaded(true)}
                        onError={(e) => {
                            e.target.src = '/placeholder-image.jpg';
                            setIsImageLoaded(true);
                        }}
                    />
                    
                    {/* Overlay Controls */}
                    <div className="image-overlay">
                        <IconButton 
                            className="zoom-button"
                            onClick={toggleZoom}
                            size="small"
                        >
                            <ZoomIn size={20} />
                        </IconButton>
                        
                        <Chip 
                            label={`${currentImageIndex + 1} / ${totalImages}`}
                            className="image-counter"
                            size="small"
                        />
                    </div>
                    
                    {/* Navigation Arrows */}
                    {totalImages > 1 && (
                        <>
                            <IconButton 
                                className="nav-button nav-button-left"
                                onClick={prevImage}
                                disabled={currentImageIndex === 0}
                            >
                                <ChevronLeft size={24} />
                            </IconButton>
                            
                            <IconButton 
                                className="nav-button nav-button-right"
                                onClick={nextImage}
                                disabled={currentImageIndex === totalImages - 1}
                            >
                                <ChevronRight size={24} />
                            </IconButton>
                        </>
                    )}
                </div>
            </div>

            {/* Thumbnail Navigation */}
            {totalImages > 1 && (
                <div className="thumbnail-container">
                    {Array.from({ length: totalImages }, (_, index) => (
                        <div 
                            key={index}
                            className={`thumbnail-wrapper ${currentImageIndex === index ? 'active' : ''}`}
                            onClick={() => goToImage(index)}
                        >
                            <img 
                                src={getImageUrl(index)}
                                alt={`Thumbnail ${index + 1}`}
                                className="thumbnail-image"
                                onError={(e) => {
                                    e.target.src = '/placeholder-image.jpg';
                                }}
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* Product Badge */}
            <div className="product-badges">
                <Chip 
                    label="New Arrival"
                    className="product-badge new-badge"
                    size="small"
                />
                {props.item.sale && (
                    <Chip 
                        label="Sale"
                        className="product-badge sale-badge"
                        size="small"
                    />
                )}
            </div>
        </div>
    );
};

export default ProductCarousel;

