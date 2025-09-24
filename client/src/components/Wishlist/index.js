import { useContext, useEffect } from 'react';
import { WishItemsContext } from '../../Context/WishItemsContext';
import WishCard from '../Card/Wishlist/WishCard';
import './index.css';
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {
    const wishItems = useContext(WishItemsContext);
    const navigate = useNavigate();

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }, []);

    console.log("wish items: ", wishItems);

    return ( 
        <div className="wishlist">
            <div className="wishlist__container">
                <div className="wishlist__header">
                    <h2>Your Wishlist</h2>
                </div>

                <div className="wishlist__items__container">
                    {wishItems.items.length > 0 ? (
                        <div className="wishlist__items">
                            {wishItems.items.map((item) => (
                                <WishCard key={item._id} item={item} />
                            ))}
                        </div>
                    ) : (
                        <div className="wishlist__empty">
                            <p class="color">Your wishlist is empty</p>
                            <button 
                                className="wishlist__btn"
                                onClick={() => navigate('/shop')}
                            >
                                Get Started
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Wishlist;
