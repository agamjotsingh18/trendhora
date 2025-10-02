import React, { createContext, useState, useContext } from 'react';

const ComparisonContext = createContext();

export const useComparison = () => {
  const context = useContext(ComparisonContext);
  if (!context) {
    throw new Error('useComparison must be used within ComparisonProvider');
  }
  return context;
};

export const ComparisonProvider = ({ children }) => {
  const [compareItems, setCompareItems] = useState([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  const addToCompare = (item) => {
    if (compareItems.length >= 3) return false;
    if (compareItems.find(p => p._id === item._id)) return false;
    setCompareItems([...compareItems, item]);
    return true;
  };

  const removeFromCompare = (itemId) => {
    setCompareItems(compareItems.filter(item => item._id !== itemId));
  };

  const clearCompare = () => {
    setCompareItems([]);
  };

  const openCompareModal = () => {
    setIsCompareModalOpen(true);
  };

  const closeCompareModal = () => {
    setIsCompareModalOpen(false);
  };

  return (
    <ComparisonContext.Provider value={{
      compareItems,
      addToCompare,
      removeFromCompare,
      clearCompare,
      isCompareModalOpen,
      openCompareModal,
      closeCompareModal
    }}>
      {children}
    </ComparisonContext.Provider>
  );
};