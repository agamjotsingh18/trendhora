const axios = require("axios");
const { asyncHandler } = require("../utility/asyncHandler");

const CHAPA_URL =
  process.env.CHAPA_URL || "https://api.chapa.co/v1/transaction/initialize";
const CHAPA_AUTH = process.env.CHAPA_AUTH; // API key from Chapa

// ------------------------ INITIALIZE PAYMENT ------------------------
const initializePayment = asyncHandler(async (req, res) => {
  const config = {
    headers: { Authorization: CHAPA_AUTH },
  };

  const CALLBACK_URL = "http://localhost:3000"; // redirect URL after successful payment
  const txRef = "tx-myecommerce12345-" + Date.now(); // unique transaction reference

  const data = {
    amount: req.body.amount,
    currency: "ETB",
    email: req.body.email || "ato@ekele.com",
    first_name: req.body.first_name || "Ato",
    last_name: req.body.last_name || "Ekele",
    tx_ref: txRef,
    callback_url: CALLBACK_URL,
  };

  try {
    const response = await axios.post(CHAPA_URL, data, config);
    res.status(200).json({ checkout_url: response.data.data.checkout_url });
  } catch (err) {
    console.error("Payment initialization failed:", err.message);
    res
      .status(500)
      .json({ message: "Payment initialization failed", error: err.message });
  }
});

// ------------------------ VERIFY PAYMENT ------------------------
const verifyPayment = asyncHandler(async (req, res) => {
  const config = {
    headers: { Authorization: CHAPA_AUTH },
  };

  try {
    const response = await axios.get(
      `${CHAPA_URL.replace("/initialize", "")}/verify/${req.params.id}`,
      config
    );
    res.status(200).json({ success: true, data: response.data });
  } catch (err) {
    console.error("Payment verification failed:", err.message);
    res
      .status(500)
      .json({
        success: false,
        message: "Payment verification failed",
        error: err.message,
      });
  }
});

module.exports = { initializePayment, verifyPayment };
