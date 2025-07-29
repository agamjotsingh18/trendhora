import "./Refund.css"

const RefundPage = () => {
    return (
        <div className="refund-container">
            <h1>Check Refund Status</h1>
            <p>Enter your Order ID to check the status of your refund.</p>
            <form className="refund-form">
                <input type="text" placeholder="Enter Order ID" />
                <button>Check Status</button>
            </form>
        </div>
    )
}

export default RefundPage;