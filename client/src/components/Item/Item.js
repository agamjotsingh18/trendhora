import ItemCarousel from "./Carousel/ItemCarousel";
import Description from "./Description/Description";
import Detail from "./Detail/Detail";
import "./Item.css";
import Related from "./Related/Related";
import { Link } from "react-router-dom";

const Item = (props) => {
  const item = props?.item;

  if (!item) {
    return <div className="item__container">Loading...</div>;
  }

  return (
    <div className="item__container">
      <Link to={`/category/${item.category || ""}`}>
        <button className="exit-btn">Exit</button>
      </Link>

      <div className="detail__and__carousel__container">
        <ItemCarousel item={item} />
        <Detail item={item} />
      </div>

      <div className="item__description__container">
        <Description item={item} />
      </div>

      <div className="related__items__container">
        <Related category={item.category || ""} />
      </div>
    </div>
  );
};

export default Item;
