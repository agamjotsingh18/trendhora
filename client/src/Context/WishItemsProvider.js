import { useContext, useState, useEffect } from "react";
import { CartItemsContext } from "./CartItemsContext";
import { WishItemsContext } from "./WishItemsContext";

const WishItemsProvider = (props) => {
    // Initialize from localStorage so wishlist persists across reloads
    const initial = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const [ wishItems, setWishItems ] = useState(initial)

    const cartItems = useContext(CartItemsContext)

    const addToCartHandler = (item) => {
        cartItems.addItem(item, 1)
    }

    const addToWishHandler = (item) => {
        const { _id, name, price, image, category, size } = item;
        const newItem = { _id, name, price, image, category, size, itemQuantity: 1 };
        const updated = [...wishItems, newItem];
        setWishItems(updated);
        localStorage.setItem('wishlist', JSON.stringify(updated));
        return 'added';
    }

    const removeFromWishHandler = (item) => {
        const updated = wishItems.filter((prevItem) => prevItem._id !== item._id);
        setWishItems(updated);
        localStorage.setItem('wishlist', JSON.stringify(updated));
        return 'removed';
    }

    // Toggle: if exists remove, otherwise add
    const toggleWishHandler = (item) => {
        const exists = wishItems.some((i) => i._id === item._id);
        if (exists) return removeFromWishHandler(item);
        return addToWishHandler(item);
    }

    useEffect(() => {
        // Keep localStorage in sync if other components update it directly
        const handleStorage = (e) => {
            if (e.key === 'wishlist') {
                const parsed = JSON.parse(e.newValue || '[]');
                setWishItems(parsed);
            }
        }
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    const wishItemsCtx = {
        items: wishItems,
        addItem: addToWishHandler,
        removeItem: removeFromWishHandler,
        toggleItem: toggleWishHandler,
        addToCart: addToCartHandler
    }

    return (
        <WishItemsContext.Provider value={wishItemsCtx}>
            {props.children}
        </WishItemsContext.Provider>
     );
}

export default WishItemsProvider;