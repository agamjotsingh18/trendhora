"use client"

import { useEffect } from "react"
import "./TermsConditions.css"

const TermsConditions = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    })
  }, [])

  const handleBack = () => {
    window.scrollTo(0, 0)
    window.history.back()
  }

  return (
    <div className="terms-page-wrapper">
      <div className="terms-container">
        <div className="back-button-container">
          <button onClick={handleBack} className="back-button" aria-label="Go back to previous page">
            <span className="back-icon">←</span>
            <span>Back</span>
          </button>
        </div>

        <div className="terms-header-card">
          <h1 className="terms-title">Terms & Conditions</h1>
          <p className="terms-date">Last updated: January 2025</p>
        </div>

        <div className="terms-content">
          <div className="terms-card">
            <h2 className="section-title">1. Acceptance of Terms</h2>
            <p className="section-content">
              By accessing and using TrendHora ("the Website"), you accept and agree to be bound by the terms and
              provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </div>

          <div className="terms-card">
            <h2 className="section-title">2. Use License</h2>
            <p className="section-content">
              Permission is granted to temporarily download one copy of the materials (information or software) on
              TrendHora for personal, non-commercial transitory viewing only. This is the grant of a license, not a
              transfer of title, and under this license you may not:
            </p>
            <ul className="terms-list">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to reverse engineer any software contained on TrendHora</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
            </ul>
          </div>

          <div className="terms-card">
            <h2 className="section-title">3. Product Information</h2>
            <p className="section-content">
              We strive to display accurate product information, including prices, descriptions, and availability.
              However, we do not warrant that product descriptions or other content is accurate, complete, reliable,
              current, or error-free.
            </p>
          </div>

          <div className="terms-card">
            <h2 className="section-title">4. Pricing and Payment</h2>
            <p className="section-content">
              All prices are in Dollar ($) and are subject to change without notice. Payment must be made at the time of
              order placement. We accept various payment methods as displayed during checkout.
            </p>
          </div>

          <div className="terms-card">
            <h2 className="section-title">5. Shipping and Delivery</h2>
            <p className="section-content">
              Delivery times are estimates only. We are not responsible for delays beyond our control. Risk of loss and
              title for items purchased pass to you upon delivery of the items to the carrier.
            </p>
          </div>

          <div className="terms-card">
            <h2 className="section-title">6. Returns and Refunds</h2>
            <p className="section-content">
              Returns are accepted within 30 days of delivery for unused items in original packaging. Refunds will be
              processed within 5-7 business days after we receive the returned item.
            </p>
          </div>

          <div className="terms-card">
            <h2 className="section-title">7. User Accounts</h2>
            <p className="section-content">
              You are responsible for maintaining the confidentiality of your account and password. You agree to accept
              responsibility for all activities that occur under your account or password.
            </p>
          </div>

          <div className="terms-card">
            <h2 className="section-title">8. Privacy</h2>
            <p className="section-content">
              Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the
              Website, to understand our practices.
            </p>
          </div>

          <div className="terms-card">
            <h2 className="section-title">9. Limitation of Liability</h2>
            <p className="section-content">
              In no event shall TrendHora or its suppliers be liable for any damages (including, without limitation,
              damages for loss of data or profit, or due to business interruption) arising out of the use or inability
              to use the materials on TrendHora.
            </p>
          </div>

          <div className="terms-card">
            <h2 className="section-title">10. Governing Law</h2>
            <p className="section-content">
              These terms and conditions are governed by and construed in accordance with the laws of India and you
              irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </div>
        </div>

        <div className="contact-card">
          <p className="contact-info">
            If you have any questions about these Terms & Conditions, please contact us at{" "}
            <a href="mailto:shop@trendhora.com" className="contact-link">
              shop@trendhora.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default TermsConditions
