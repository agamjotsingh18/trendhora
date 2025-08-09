import "./Shipping.css"

const ShippingPage = () => {
    return (
        <div className="container" style={{ paddingTop: '160px' }}>
            <div className="heading">
                <h1>Shipping Information</h1>
            </div>

            <h2>Shipping Locations</h2>
            <p>We currently ship to all locations within India. International shipping is available to select countries.</p>

            <h2>Shipping Charges</h2>
            <p>There are no shipping charges for deliveries within India. For international orders, shipping charges will be calculated at checkout.</p>

            <h2>Delivery Time</h2>
            <p>All orders are processed within 1-2 business days. Delivery takes 3-7 working days depending on your location.</p>

            <h2>Cash on Delivery</h2>
            <p>COD is available on orders between ₹1,000 and ₹10,000 based on pin code eligibility.</p>

            <h2>Order Tracking</h2>
            <p>You will receive a tracking number via email or SMS once your order is shipped.</p>

            <h2>Delays</h2>
            <p>Delivery times may be affected during national holidays, natural calamities, or unforeseen courier delays.</p>
        </div>
    )
}

export default ShippingPage;