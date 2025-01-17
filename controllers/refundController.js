const { getSpreadsheetData } = require("../services/googleSheetService");
const { parse } = require("date-fns");

const findBestDay = async (req, res) => {
  const { url, startDate, endDate } = req.body;

  if (!url || !startDate || !endDate) {
    return res
      .status(400)
      .json({ error: "Missing required parameters: url, startDate, endDate" });
  }

  try {
    // Fetch data from Google Sheets
    const { ordersData, lineItemsData } = await getSpreadsheetData(url);

    // Parse dates and filter orders within the range
    const start = parse(startDate, "dd-MM-yyyy", new Date());
    const end = parse(endDate, "dd-MM-yyyy", new Date());

    const ordersInRange = ordersData.filter(([orderId, orderDate]) => {
      const date = parse(orderDate, "dd-MM-yyyy", new Date());
      return date >= start && date <= end;
    });

    // Calculate total prices by order date
    const pricesByDate = {};
    ordersInRange.forEach(([orderId, orderDate]) => {
      const lineItems = lineItemsData.filter(
        ([, itemOrderId]) => itemOrderId === orderId
      );
      const totalPrice = lineItems.reduce(
        (sum, [, , price]) => sum + parseFloat(price),
        0
      );
      pricesByDate[orderDate] = (pricesByDate[orderDate] || 0) + totalPrice;
    });

    // Find the best day to save
    const allRefundedPrice = Object.values(pricesByDate).reduce(
      (a, b) => a + b,
      0
    );
    let minRefund = Infinity;
    let bestDay = "";

    Object.entries(pricesByDate).forEach(([date, price]) => {
      const refund = allRefundedPrice - price;
      if (refund < minRefund) {
        minRefund = refund;
        bestDay = date;
      }
    });

    // Return the best day
    res.json({ bestDay });
  } catch (error) {
    console.error("Error:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while processing the data." });
  }
};

module.exports = { findBestDay };
