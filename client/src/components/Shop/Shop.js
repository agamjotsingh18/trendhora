import { useEffect, useState } from "react";
import { TabTitle } from "../../utils/General";
import axios from "axios";
import ShopCategory from "./Container/ShopCategory";
import "./Shop.css";
import ReactLoading from "react-loading";

const Shop = () => {
  TabTitle("Shop - SHEMA");
  const [menItems, setMenItems] = useState([]);
  const [womenItems, setWomenItems] = useState([]);
  const [kidsItems, setKidsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);
    axios
      .get("https://shema-backend.vercel.app/api/items", { signal: controller.signal })
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [];
        const men = data.filter((item) => item?.category === "men");
        const women = data.filter((item) => item?.category === "women");
        const kids = data.filter((item) => item?.category === "kids");
        setMenItems(men);
        setWomenItems(women);
        setKidsItems(kids);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        console.error(err);
        setError("Failed to load products. Please try again.");
      })
      .finally(() => setLoading(false));
    window.scrollTo(0, 0);
    return () => controller.abort();
  }, []);

  return (
    <div className="shop__contianer">
      {loading && (
        <ReactLoading
          type="balls"
          color="#FFE26E"
          height={100}
          width={100}
          className="container h-100 w-10 justify-self-center align-self-center m-auto"
        />
      )}
      {error && (
        <div className="shop__loading" role="alert" style={{ color: "#b00020", textAlign: "center" }}>
          {error}
        </div>
      )}
      {menItems && menItems.length > 0 && (
        <ShopCategory name="Men" key="men" items={menItems} category="men" />
      )}
      {womenItems && womenItems.length > 0 && (
        <ShopCategory
          name="Women"
          key="women"
          items={womenItems}
          category="women"
        />
      )}
      {kidsItems && kidsItems.length > 0 && (
        <ShopCategory
          name="Kids"
          key="kids"
          items={kidsItems}
          category="kids"
        />
      )}
    </div>
  );
};

export default Shop;
