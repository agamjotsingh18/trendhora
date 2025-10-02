import React from 'react';
import { useComparison } from '../../Context/ComparisonContext';
import './ComparisonButton.css';

const ComparisonButton = () => {
  const { compareItems, openCompareModal } = useComparison();

  if (compareItems.length === 0) return null;

  return (
    <button 
      className="comparison-floating-btn" 
      onClick={openCompareModal}
    >
      Compare ({compareItems.length})
    </button>
  );
};

export default ComparisonButton;