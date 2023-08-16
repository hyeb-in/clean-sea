import * as swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  swaggerDefinition: {
    info: {
      title: "Test API",
      version: "1.0.0",
      description: "Test API with express",
    },
    host: "localhost:5001",
    basePath: "/",
  },
  apis: ["./src/routes/*.ts", "./src/swagger/*"],
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs };
