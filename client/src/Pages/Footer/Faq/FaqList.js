import FaqItem from "./FaqItem.js"

const FaqList = () => {

    const FaqData = [
        {
            question: "Do I have to pay shipment charges?",
            answer: "There are no shipping/delivery charges within India. For information on shipping charges for international orders, please see the Shipping and Handling Charges section under."
        },
        {
            question: "Sending gifts to loved ones?",
            answer: "You can send any product from TrendHora as a gift to your loved ones, with the option to include a personalized message."
        },
        {
            question: "What is the Cash on Delivery (COD) payment option?",
            answer: "Cash on Delivery is a payment method offered by trendHora, allowing you to pay in cash upon receiving your product. No advance payment is required for COD orders."
        },
        {
            question: "Is there an extra charge for using Cash on Delivery?",
            answer: "No, there is no additional fee for opting for the COD service."
        },
        {
            question: " Is there a limit on the cart value for COD orders?",
            answer: "Currently, COD is available for orders with a cart value ranging between INR 1,000 and INR 10,000, depending on eligible pin codes within India."
        },
        {
            question: "How will I receive my refund for a COD order?",
            answer: "Refunds for COD orders can be processed via cheque or online transfer (NEFT). Option A: If you provide a canceled cheque with the returned product, the refund will be processed via NEFT within 7-15 working days. Option B: Without a canceled cheque, the refund will be sent by cheque to the address provided at the time of the order, which may take up to 30 working days."
        },
        {
            question: "How do I cancel my COD order?",
            answer: "You can cancel a COD order by calling customer care at 91-93190-42075 or emailing agamjotsingh1801@gmail.com, provided the order has not yet been shipped."
        },
        {
            question: "What if it gets lost or mis-product?",
            answer: "In the rare event that you receive the wrong product, we will gladly arrange for a replacement. If a replacement is not feasible, we will issue a refund through the payment method you used at the time of purchase."
        },
        {
            question: "What currencies are accepted for Cash on Delivery?",
            answer: "Only Indian Rupees (INR) are accepted for COD payments. Notes of Rs 500 and Rs 1,000, which were declared illegal on November 9, 2016, will not be accepted."
        }
    ]

    return (
        <div className="container" style={{ paddingTop: '160px' }}>
            <div className="heading">
                <h1>Frequently asked Questions</h1>
            </div>
            {FaqData.map((faq,idx)=>(
                <FaqItem key={idx} question={faq.question} answer={faq.answer} />
            ))}
        </div>
    )
}

export default FaqList;