import './Description.css';
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  Typography, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  Chip
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SecurityIcon from '@mui/icons-material/Security';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const Description = (props) => {
  const [expanded, setExpanded] = useState('details');

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // Mock data for highlights if not available
  const highlights = props.item.highlights || [
    "100% authentic product",
    "Premium quality materials",
    "Expert craftsmanship",
    "Sustainable manufacturing",
    "Designer collaboration"
  ];

  const specifications = [
    { label: "Material", value: "Premium Cotton Blend" },
    { label: "Care Instructions", value: "Machine wash cold, tumble dry low" },
    { label: "Origin", value: "Designed in Italy" },
    { label: "Fit", value: "Regular fit, true to size" },
    { label: "Model", value: "185cm, wearing size M" }
  ];

  return (
    <div className="enterprise-description-container">
      {/* Main Description Card */}
      <Card className="description-main-card">
        <CardContent>
          <Typography variant="h4" className="description-title">
            Product Details
          </Typography>
          <Typography variant="body1" className="description-text">
            {props.item.details || props.item.description || 
            "Discover exceptional quality and timeless design with this premium piece. Crafted with attention to detail and made from the finest materials, this product represents the perfect blend of style, comfort, and durability."}
          </Typography>
        </CardContent>
      </Card>

      {/* Expandable Sections */}
      <div className="description-accordions">
        {/* Product Details */}
        <Accordion 
          expanded={expanded === 'details'} 
          onChange={handleChange('details')}
          className="description-accordion"
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            className="accordion-header"
          >
            <InfoOutlinedIcon className="accordion-icon" />
            <Typography variant="h6">Product Information</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="specifications-grid">
              {specifications.map((spec, index) => (
                <div key={index} className="specification-item">
                  <span className="spec-label">{spec.label}:</span>
                  <span className="spec-value">{spec.value}</span>
                </div>
              ))}
            </div>
          </AccordionDetails>
        </Accordion>

        {/* Highlights */}
        <Accordion 
          expanded={expanded === 'highlights'} 
          onChange={handleChange('highlights')}
          className="description-accordion"
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            className="accordion-header"
          >
            <CheckCircleOutlineIcon className="accordion-icon" />
            <Typography variant="h6">Key Features</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="highlights-container">
              {highlights.map((highlight, index) => (
                <div key={index} className="highlight-item">
                  <CheckCircleOutlineIcon className="highlight-icon" />
                  <Typography variant="body2">{highlight}</Typography>
                </div>
              ))}
            </div>
          </AccordionDetails>
        </Accordion>

        {/* Shipping & Returns */}
        <Accordion 
          expanded={expanded === 'shipping'} 
          onChange={handleChange('shipping')}
          className="description-accordion"
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            className="accordion-header"
          >
            <LocalShippingIcon className="accordion-icon" />
            <Typography variant="h6">Shipping & Returns</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="shipping-info">
              <div className="shipping-item">
                <LocalShippingIcon className="shipping-icon" />
                <div>
                  <Typography variant="subtitle2">Free Standard Shipping</Typography>
                  <Typography variant="body2" color="text.secondary">
                    On orders over $100. Delivery in 3-5 business days.
                  </Typography>
                </div>
              </div>
              
              <div className="shipping-item">
                <SecurityIcon className="shipping-icon" />
                <div>
                  <Typography variant="subtitle2">Easy Returns</Typography>
                  <Typography variant="body2" color="text.secondary">
                    30-day return policy. Free return shipping.
                  </Typography>
                </div>
              </div>
              
              <div className="shipping-item">
                <SupportAgentIcon className="shipping-icon" />
                <div>
                  <Typography variant="subtitle2">Customer Support</Typography>
                  <Typography variant="body2" color="text.secondary">
                    24/7 customer service. Live chat available.
                  </Typography>
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>

      {/* Trust Badges */}
      <div className="trust-badges">
        <Chip 
          icon={<SecurityIcon />} 
          label="Secure Checkout" 
          className="trust-badge"
        />
        <Chip 
          icon={<CheckCircleOutlineIcon />} 
          label="Authentic Products" 
          className="trust-badge"
        />
        <Chip 
          icon={<LocalShippingIcon />} 
          label="Fast Shipping" 
          className="trust-badge"
        />
      </div>
    </div>
  );
}

export default Description;