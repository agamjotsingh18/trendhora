import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactLoading from "react-loading";
import Item from "../components/Item/Item";

const ProductView = (props) => {
  const { id } = useParams();
  const [item, setItem] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/items`)
      .then((res) => {
        // Ensure we get a single object, not an array
        const foundItem = res.data.find((itm) => itm._id === id);
        setItem(foundItem);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ minHeight: "100vh", width: "100%" }}
    >
      {loading && (
        <div className="text-center">
          <ReactLoading
            type="balls"
            color="#FFE26E"
            height={100}
            width={100}
            className="m-auto"
          />
          <p
            style={{
              color: "#FFE26E",
              fontSize: "1.2rem",
              marginTop: "1rem",
              fontWeight: "500",
            }}
          >
            Loading...
          </p>
        </div>
      )}

      {!loading && item && <Item item={item} />}
      {!loading && !item && (
        <p style={{ color: "#FFE26E", fontSize: "1.2rem" }}>Item not found!</p>
      )}
    </div>
  );
};

export default ProductView;
