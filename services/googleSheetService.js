const { google } = require("googleapis");

const getSpreadsheetData = async (url) => {
  // Extract Spreadsheet ID from URL
  const spreadsheetId = url.match(/\/d\/(.*?)\//)[1];
  console.log(spreadsheetId);

  // Authenticate with Google Sheets API
  const auth = new google.auth.GoogleAuth({
    keyFile: "service-account.json", // Path to your service account JSON file
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });
  const sheets = google.sheets({ version: "v4", auth });

  // Fetch data from Orders and LineItems sheets
  const ordersSheet = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "Orders!A:B",
  });
  const lineItemsSheet = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "LineItems!A:C",
  });

  return {
    ordersData: ordersSheet.data.values.slice(1), // Exclude header row
    lineItemsData: lineItemsSheet.data.values.slice(1), // Exclude header row
  };
};

module.exports = { getSpreadsheetData };
