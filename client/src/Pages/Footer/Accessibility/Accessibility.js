import "./Accessibility.css"
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';

const AccessiblityPage = () => {
    return (
        <div className="accessibility-container">
            <h1>Accessibility Statement</h1>
                <p>
                    At TrendHora, we are committed to ensuring that our website is accessible to all users, regardless of ability.
                </p>
                <p>
                    We are continuously working to improve the user experience for everyone and apply relevant accessibility standards as outlined in the Web Content Accessibility Guidelines (WCAG) 2.1.
                </p>

                <h2>What We've Done</h2>
                <ul className="list">
                    <li className="list-item">Used readable fonts and proper color contrast</li>
                    <li className="list-item">Ensured keyboard navigation across the site</li>
                    <li className="list-item">Added alt text to all images</li>
                    <li className="list-item">Implemented ARIA labels where needed</li>
                </ul>

                <h2>Need Help?</h2>
                <p>
                    If you have difficulty accessing any part of our site, please reach out to us:
                </p>
                <p> <EmailIcon /> Email: <a href="mailto:agamjotsingh1801@gmail.com" style={{color:"#444"}}>shop@trendhora.com</a></p>
                <p> <LocalPhoneIcon /> Phone: +91-93190-42075</p>
        </div>
    )
}

export default AccessiblityPage;