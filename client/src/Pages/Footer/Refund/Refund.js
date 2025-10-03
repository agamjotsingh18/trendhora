import { useEffect } from "react";
import {useTheme} from "../../../Context/ThemeContext";
import "./Refund.css"

const RefundPage = () => {
    const { theme }= useTheme();
    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }, []);

    return (
        <div className="refund-container" style={{ paddingTop: '160px' }}>
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