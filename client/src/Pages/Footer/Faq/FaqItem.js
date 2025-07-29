import "./Faq.css"
import { useState } from "react";

const FaqItem = ({ question, answer }) => {

    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    }

    return (
        <>
            <div className="faq-container">
                <div className="question" onClick={handleClick}>
                    <span>{question}</span>
                    <span className="faq-toggle-button">{isOpen ? 'x' : '+'}</span>
                </div>
            </div>
            {isOpen && <div className="answer">{answer}</div>}
        </>
    )
}

export default FaqItem;