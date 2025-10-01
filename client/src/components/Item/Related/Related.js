
import { useState, useEffect } from "react";
import axios from "axios";
import RelatedCard from "../../Card/RelatedCard/RelatedCard";
import "./Related.css";

const Related = (props) => {
  const [menItems, setMenItems] = useState();
  const [womenItems, setWomenItems] = useState();
  const [kidsItems, setKidsItems] = useState();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/items`)
      .then((res) => {
        setMenItems(res.data.filter((item) => item.category === "men"));
        setKidsItems(res.data.filter((item) => item.category === "kids"));
        setWomenItems(res.data.filter((item) => item.category === "women"));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="related__products">
      <div className="related__header__container">
        <div className="related__header">
          <h2>
            RECOMMENDED PRODUCTS{" "}
            <span class="badge text-bg-danger">TRY NOW</span>
          </h2>
        </div>
        <div className="related__header__line"></div>
      </div>
      <div className="related__card__container">
        <div className="related__product__card">
          {menItems &&
            props.category === "men" &&
            menItems.map((item) => <RelatedCard item={item} />)}
          {womenItems &&
            props.category === "women" &&
            womenItems.map((item) => <RelatedCard item={item} />)}
          {kidsItems &&
            props.category === "kids" &&
            kidsItems.map((item) => <RelatedCard item={item} />)}
        </div>
      </div>
    </div>
  );
};

export default Related;

import { useState, useEffect } from 'react';
import axios from 'axios'; 
import RelatedCard from '../../Card/RelatedCard/RelatedCard';
import './Related.css';
import { Typography, Container, Grid, Chip, Skeleton } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const Related = (props) => {
    const [menItems, setMenItems] = useState([]);
    const [womenItems, setWomenItems] = useState([]);
    const [kidsItems, setKidsItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/items`)
            .then(res => {
                const items = res.data;
                setMenItems(items.filter(item => item.category === "men").slice(0, 8));
                setKidsItems(items.filter(item => item.category === "kids").slice(0, 8));
                setWomenItems(items.filter(item => item.category === "women").slice(0, 8));
                setLoading(false);
            })
            .catch(err => {
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
            <div className="enterprise-related-container">
                <Container maxWidth="xl">
                    <div className="related-header">
                        <Skeleton variant="text" width={300} height={60} />
                        <Skeleton variant="text" width={200} height={30} />
                    </div>
                    <Grid container spacing={3} className="products-grid">
                        {[...Array(8)].map((_, index) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                <Skeleton variant="rectangular" height={300} className="product-skeleton" />
                                <Skeleton variant="text" width="80%" height={30} style={{ margin: '1rem 0 0.5rem' }} />
                                <Skeleton variant="text" width="60%" height={25} />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </div>
        );
    }

    if (error) {
        return (
            <div className="enterprise-related-container">
                <Container maxWidth="xl">
                    <div className="error-message">
                        <Typography variant="h6" color="error">{error}</Typography>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="enterprise-related-container">
            <Container maxWidth="xl">
                <div className="related-header">
                    <div className="header-content">
                        <TrendingUpIcon className="trending-icon" />
                        <Typography variant="h3" className="section-title">
                            Recommended Products
                        </Typography>
                    </div>
                    <Chip 
                        label="Try Now" 
                        className="try-now-chip"
                        size="medium"
                    />
                    <Typography variant="body1" className="section-subtitle">
                        Discover more items you might love from our {props.category} collection
                    </Typography>
                </div>

                <Grid container spacing={3} className="products-grid">
                    {currentItems.map((item, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={item._id || index}>
                            <div className="product-card-wrapper">
                                <RelatedCard item={item} />
                            </div>
                        </Grid>
                    ))}
                </Grid>

                {currentItems.length === 0 && (
                    <div className="no-items-message">
                        <Typography variant="h6" color="text.secondary">
                            No recommendations available at the moment
                        </Typography>
                    </div>
                )}
            </Container>
        </div>
    );
}

export default Related;

