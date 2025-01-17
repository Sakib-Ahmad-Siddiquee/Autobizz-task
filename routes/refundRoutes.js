const express = require("express");
const { findBestDay } = require("../controllers/refundController");

const router = express.Router();

/**
 * @swagger
 * /api/find-best-day:
 *   post:
 *     summary: Finds the best day to save orders and minimize refunds.
 *     description: Given a Google Spreadsheet URL, start date, and end date, the API calculates the best day to save.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 description: Public Google Spreadsheet URL.
 *                 example: "https://docs.google.com/spreadsheets/d/1-Xes8FJmq25ik2Oyn9YmWxq9ba4zMeK6MyvbCEK7Zms/edit?usp=sharing"
 *               startDate:
 *                 type: string
 *                 description: Start date of the range (dd-mm-yyyy).
 *                 example: "01-01-2025"
 *               endDate:
 *                 type: string
 *                 description: End date of the range (dd-mm-yyyy).
 *                 example: "08-01-2025"
 *     responses:
 *       200:
 *         description: Best day to save.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 bestDay:
 *                   type: string
 *                   description: The best day to save.
 *                   example: "05-01-2025"
 *       400:
 *         description: Invalid request.
 *       500:
 *         description: Internal server error.
 */
router.post("/find-best-day", findBestDay);

module.exports = router;
