const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Refund Calculator API",
      version: "1.0.0",
      description:
        "API to find the best day to save orders and minimize refunds.",
    },
  },
  apis: ["./routes/refundRoutes.js"], // Swagger annotations in refundRoutes.js
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
module.exports = swaggerSpec;
