import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Landing from "../components/Landing/Landing";
import FeaturedItems from "../components/Featured/Items/FetauredItems";
import FeaturedCategories from "../components/Featured/Categories/FeaturedCategories";
import Advertisement from "../components/Popup/Advertisement/Advertisement";
import { TabTitle } from "../utils/General";

const Home = () => {
    const [featuredItems, setFeaturedItems] = useState();
    TabTitle("Trendhora");

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/items`)
            .then(res => {
                console.log("Fetched items from backend:", res.data); // Debug log
                setFeaturedItems(res.data)
            })
            .catch(err => {
                console.error("Error fetching items:", err); // Debug log
            });

        window.scrollTo(0, 0);
    }, []);

    return (
        <Fragment>
            <Advertisement />
            <Landing />
            <FeaturedCategories />
            <FeaturedItems items={featuredItems} />
        </Fragment>
    );
};

export default Home;
