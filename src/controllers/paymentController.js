exports.processPayment = async (req, res) => {
    const { orderId } = req.body;
    // Simulasi pembayaran sukses
    return res.status(200).json({ message: "Payment successful", orderId });
  };
  