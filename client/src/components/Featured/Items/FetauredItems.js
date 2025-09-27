import { Link } from "react-router-dom";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import ItemCard from '../../Card/ItemCard/ItemCard';
import ReactLoading from 'react-loading';
import './FeaturedItems.css'

const FeaturedItems = ({ items }) => {
    // Ensure we have items before trying to access them
    const featuredItems = items ? [
        items[0],
        items[4],
        items[10],
        items[20],
        items[16],
        items[5],
        items[13],
        items[23]
    ].filter(Boolean) : [];

    return (
        <div className="featured__products__container">
            <div className="featured__products">
                <div className="featured__products__header">
                    <h2 className="featured__items__header__big">Featured Items</h2>
                    <Link to="/shop" className="featured__header__small">
                        View All
                        <ArrowRightAltIcon />
                    </Link>
                </div>
                
                <div className="featured__products__card__container">
                    {!items ? (
                        <div className="d-flex min-vh-50 w-100 justify-content-center align-items-center">
                            <ReactLoading type="balls" color='#FFE26E' height={100} width={100} />
                        </div>
                    ) : featuredItems.length > 0 ? (
                        featuredItems.map((item, index) => (
                            <ItemCard key={`${item.id}-${index}`} item={item} category="featured" />
                        ))
                    ) : (
                        <p className="text-center w-100 py-5">No featured items available</p>
                    )}
                </div>
            </div>
        </div>        
    );
}
 
export default FeaturedItems;