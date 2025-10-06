import Carousel from "react-bootstrap/Carousel";
import "./ItemCarousel.css";

const ProductCarousel = (props) => {
  return (
    <div className="product__carousel__container">
      <div className="product__carousel">
        <Carousel variant="dark" interval={4000}>
          {(props.item?.image || []).map((img, idx) => (
            <Carousel.Item key={idx}>
              <div className="carousel__image__container">
                <img
                  className="carousel__image"
                  src={`${process.env.REACT_APP_BACKEND_URL}/public/${props.item?.category || ""}/${img?.filename || img}`}
                  alt={`item-${idx}`}
                />
              </div>
            </Carousel.Item>
          ))}
          {(!props.item?.image || props.item.image.length === 0) && (
            <Carousel.Item>
              <div className="carousel__image__container">
                <img
                  className="carousel__image"
                  src="https://via.placeholder.com/800x800?text=No+Image"
                  alt="no-image"
                />
              </div>
            </Carousel.Item>
          )}
        </Carousel>
      </div>
    </div>
  );
};

export default ProductCarousel;
