import { Link } from "react-router-dom";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import ItemCard from '../../Card/ItemCard/ItemCard';
import ReactLoading from 'react-loading';
import React, { useState, useEffect, useRef } from 'react';
import './FeaturedItems.css';

const FeaturedItems = (props) => {
  // Prepare featured items array
  const featuredItems = props.items
    ? [
        props.items[0],
        props.items[4],
        props.items[10],
        props.items[1],
        props.items[16],
        props.items[5],
        props.items[13],
        props.items[6],
      ].filter(Boolean)
    : [];

  const visibleCount = 3;
  const [startIdx, setStartIdx] = useState(0);
  const intervalRef = useRef();

  // Auto slide effect
  useEffect(() => {
    if (featuredItems.length <= visibleCount) return;
    intervalRef.current = setInterval(() => {
      setStartIdx((prev) => (prev + 1) % featuredItems.length);
    }, 4000);
    return () => clearInterval(intervalRef.current);
  }, [featuredItems.length]);

  // Arrow navigation handlers
  const handlePrev = () => {
    setStartIdx((prev) =>
      (prev - 1 + featuredItems.length) % featuredItems.length
    );
    resetInterval();
  };

  const handleNext = () => {
    setStartIdx((prev) => (prev + 1) % featuredItems.length);
    resetInterval();
  };

  // Reset interval on manual navigation
  const resetInterval = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setStartIdx((prev) => (prev + 1) % featuredItems.length);
    }, 4000);
  };

  // Get the 3 items to display, wrapping around
  const getVisibleItems = () => {
    if (featuredItems.length === 0) return [];
    const items = [];
    for (let i = 0; i < visibleCount; i++) {
      items.push(featuredItems[(startIdx + i) % featuredItems.length]);
    }
    return items;
  };

  return (
    <div className="featured__products__container">
      <div className="featured__products">
        <div className="featured__products__header">
          <h3 className='featured__items__header__big'>Featured Items </h3>
          <Link to="/shop" className='featured__header__small'>
            Show all<ArrowRightAltIcon />
          </Link>
        </div>
        <div className="featured__products__header__line"></div>
        <div className='d-flex min-vh-100 w-100 justify-content-center align-items-center m-auto'>
          {!props.items && (
            <ReactLoading type="balls" color='#FFE26E' height={100} width={100} className='m-auto'/>
          )}
          {props.items && (
            <div style={{
                  transition: 'transform 0.7s cubic-bezier(0.77,0,0.18,1)',
                  width: '100%',
                  position: 'relative',
                }}>
              <ul
                className="featured__products__card__container translate-slider"
                style={{
                  transition: 'transform 0.7s cubic-bezier(0.77,0,0.18,1)',
                  width: '100%',
                }}
              >
                {getVisibleItems().map((item, idx) => (
                  <li key={idx}>
                    <ItemCard item={item} category="featured" />
                  </li>
                ))}
              </ul>
              {featuredItems.length > visibleCount && (
                <div
                  style={{
                    width: '100%',
                    position: 'absolute',
                    top: '40%',
                    display: "flex",
                    justifyContent: 'space-between'
                  }}
                >
                  <button
                    id="slider-left"
                    aria-label="Previous Slide"
                    style={{
                      fontSize: '1.5rem',
                      border: '3px solid black',
                      borderRadius: '60%',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
                      fontWeight: 'bolder',
                    }}
                    onClick={handlePrev}
                  >
                    &#8592;
                  </button>
                  <button
                    id="slider-right"
                    aria-label="Next Slide"
                    style={{
                      zIndex: '10',
                      fontSize: '1.5rem',
                      border: '3px solid black',
                      borderRadius: '60%',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                      fontWeight: 'bolder',
                    }}
                    onClick={handleNext}
                  >
                    &#8594;
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedItems;