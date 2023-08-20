/**
 * @swagger
 *  tags:
 *      name: Auth
 *      description: Auth API
 *  definitions:
 *      loginRequest:
 *          type:object
 *          properties:
 *              email:
 *                  type: string
 *              password:
 *                  type:string
 *      LoginResponse:
 *          type:object
 *          properties:
 *              token:
 *                  types:string
 */
/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login
 *     parameters:
 *       - name: email
 *         description: Email
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: Password with at least 4 characters
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         schema:
 *           type: object
 *           properties:
 *               token:
 *                  type: string
 *               _id:
 *                  type: string
 *               email:
 *                  type: string
 *               name:
 *                  type: string
 */
/**
 * @swagger
 * /auth/logout:
 *  post:
 *      tags: [Auth]
 *      summary: logout
 */
//# sourceMappingURL=authSwagger.js.map