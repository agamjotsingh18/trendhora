
import React from 'react';
import ItemCarousel from './Carousel/ItemCarousel';
import Description from './Description/Description';
import Detail from './Detail/Detail';
import './Item.css';
import Related from './Related/Related';
import { Link } from 'react-router-dom';
import { ArrowLeft, Share2 } from 'lucide-react';

const Item = (props) => {
    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: props.item.name,
                text: props.item.description,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
        }
    };

    return ( 
        <div className="enterprise-item-container">
            {/* Navigation Header */}
            <div className="enterprise-nav-header">
                <div className="nav-breadcrumb">
                    <Link to={`/category/${props.item.category}`} className="back-button">
                        <ArrowLeft size={20} />
                        <span>Back to {props.item.category}</span>
                    </Link>
                    <div className="breadcrumb-path">
                        <span>Home</span> / <span>{props.item.category}</span> / <span>{props.item.name}</span>
                    </div>
                </div>
                <div className="nav-actions">
                    <button className="action-button" onClick={handleShare}>
                        <Share2 size={18} />
                        <span>Share</span>
                    </button>
                </div>
            </div>

            {/* Main Product Grid */}
            <div className="enterprise-product-grid">
                <div className="product-gallery-section">
                    <ItemCarousel item={props.item}/>
                </div>
                
                <div className="product-info-section">
                    <Detail item={props.item}/>
                </div>
            </div>

            {/* Product Description Section */}
            <div className="enterprise-description-section">
                <Description item={props.item}/>
            </div>

            {/* Recommended Products */}
            <div className="enterprise-recommendations">
                <Related category={props.item.category}/>
            </div>
        </div>
     );
}
 
export default Item;

