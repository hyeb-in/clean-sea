import * as swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  swaggerDefinition: {
    info: {
      title: "해조 API",
      version: "1.0.0",
      description: "Test API with express",
    },
    host: "localhost:5001",
    basePath: "/",
    securityDefinitions: {
      api_key: {
        type: "Authorization",
        in: "header",
        name: "jwtToken",
      },
    },
  },

  apis: ["./src/swagger/*.ts", "./swagger/*"],
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs };
