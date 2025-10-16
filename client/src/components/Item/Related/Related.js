
import { useState, useEffect } from "react";
import axios from "axios";
import RelatedCard from "../../Card/RelatedCard/RelatedCard";
import "./Related.css";

const Related = (props) => {
  const [menItems, setMenItems] = useState([]);
  const [womenItems, setWomenItems] = useState([]);
  const [kidsItems, setKidsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/items`)
      .then((res) => {
        const items = res.data;
        setMenItems(items.filter(item => item.category === "men").slice(0, 8));
        setKidsItems(items.filter(item => item.category === "kids").slice(0, 8));
        setWomenItems(items.filter(item => item.category === "women").slice(0, 8));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError('Failed to load recommendations');
        setLoading(false);
      });
  }, []);

  const getCurrentItems = () => {
    switch(props.category) {
      case "men": return menItems;
      case "women": return womenItems;
      case "kids": return kidsItems;
      default: return [];
    }
  };

  const currentItems = getCurrentItems();

  if (loading) {
    return (
      <div className="related__products">
        <div className="related__header__container">
          <div className="related__header">
            <h2>Loading Recommendations...</h2>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="related__products">
        <div className="related__header__container">
          <div className="related__header">
            <h2>{error}</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="related__products">
      <div className="related__header__container">
        <div className="related__header">
          <h2>
            RECOMMENDED PRODUCTS{" "}
            <span className="badge text-bg-danger">TRY NOW</span>
          </h2>
        </div>
        <div className="related__header__line"></div>
      </div>
      <div className="related__card__container">
        <div className="related__product__card">
{/* 
          {menItems &&
            props.category === "men" &&
            menItems.map((item) => <RelatedCard key={item._id || item.id} item={item} />)}
          {womenItems &&
            props.category === "women" &&
            womenItems.map((item) => <RelatedCard key={item._id || item.id} item={item} />)}
          {kidsItems &&
            props.category === "kids" &&
            kidsItems.map((item) => <RelatedCard key={item._id || item.id} item={item} />)} */}

          {currentItems.map((item, index) => (
            <RelatedCard key={item._id || index} item={item} />
          ))}

        </div>
      </div>
    </div>
  );
};

export default Related;

