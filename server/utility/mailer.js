const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: process.env.SMTP_PORT || 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.sendWelcomeEmail = async (to, username) => {
  try {
    const mailOptions = {
      from: `"TrendHora" <${process.env.EMAIL_USER}>`,
      to,
      subject: "👋 Welcome to TrendHora – Your Fashion Journey Begins!",
      html: `
      <div style="font-family: Arial, sans-serif; background-color:#f9f9f9; padding:20px;">
        <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 2px 8px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <div style="background:#FFE26E; color:#111; padding:20px; text-align:center;">
            <h1 style="margin:0; font-size:24px;">✨ Welcome to TrendHora ✨</h1>
            <p style="margin:0; font-size:14px;">Your gateway to the best fashion trends</p>
          </div>
          
          <!-- Body -->
          <div style="padding:30px; color:#333; line-height:1.6;">
            <h2 style="color:#111;">Hi ${username || "Fashion Enthusiast"},</h2>
            <p>
              Thank you for joining <strong>TrendHora</strong> – a cutting-edge ecommerce platform.  
              We're excited to have you as part of our fashion community!
            </p>

            <p>
              With TrendHora, you can:
            </p>
            <ul style="padding-left:20px;">
              <li>🛒 Browse and shop the latest collections</li>
              <li>👟 Discover top brands like Nike, Balenciaga, Jacquemus, and more</li>
              <li>📱 Enjoy a smooth and accessible shopping experience</li>
            </ul>

            <div style="margin:25px 0; text-align:center;">
              <a href="https://trendhora.com" style="background:#FFE26E; color:#111; padding:12px 25px; border-radius:5px; text-decoration:none; font-weight:bold;">
                Start Shopping
              </a>
            </div>

            <p>
              If you have any questions, feel free to reach us at 
              <a href="mailto:shop@trendhora.com">shop@trendhora.com</a> or call us at <strong>+91 93190-42075</strong>.
            </p>
          </div>
          
          <!-- Footer -->
          <div style="background:#FFE26E; padding:20px; text-align:center; font-size:13px; color:#555;">
            <p>📍 Delhi, India</p>
            <p>©2025 TrendHora | <a href="https://trendhora.com/terms" style="color:#111; text-decoration:none;">Terms & Conditions</a> | 
            <a href="https://trendhora.com/privacy" style="color:#111; text-decoration:none;">Privacy Policy</a></p>
          </div>
        </div>
      </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Welcome email sent to ${to}`);
  } catch (err) {
    console.error("❌ Error sending welcome email:", err.message);
    throw err;
  }
};
