/**
 * @swagger
 * tags:
 *   name: Travels
 *   description: Travel management
 * definitions:
 *   Travel:
 *     type: object
 *     properties:
 *       author:
 *         type: string
 *         description: userId
 *       beachId:
 *         type: string
 *         description: beachId
 *       date:
 *         type: date
 *         description: visited date
 */
/**
 * @swagger
 * /travels/register:
 *   post:
 *     summary: Create a new travel
 *     tags: [Travels]
 *     parameters:
 *       - name: author
 *         in: path
 *         required: false
 *         schema:
 *           type: string
 *         description: userId
 *       - name: beachId
 *         in: formData
 *         required: true
 *         type: string
 *         description: beachId
 *       - name: date
 *         in: formData
 *         required: true
 *         type: date
 *         description: date
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               beachId:
 *                 type: string
 *                 description: beachId
 *               date:
 *                 type: date
 *                 description: date
 *               author:
 *                 type: string
 *                 description: userId
 *     responses:
 *       200:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Travel'
 *       400:
 *         description: Bad Request
 */
/**
 * @swagger
 * /travels/travelList:
 *   get:
 *     summary: Get travels created by the authenticated user
 *     tags: [Travels]
 *     responses:
 *       200:
 *         description: A list of travels
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Travel'
 */
/**
 * @swagger
 * /travels/{userId}:
 *   get:
 *     summary: Get travels by a specific user
 *     tags: [Travels]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID whose travels are being retrieved
 *     responses:
 *       200:
 *         description: A list of travels
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Travel'
 */
/**
 * @swagger
 * /travels/{travelId}:
 *   put:
 *     summary: Update a travel by travel ID
 *     tags: [Travels]
 *     parameters:
 *       - name: travelId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Travel ID to update
 *       - name: beachId
 *         in: formData
 *         required: false
 *         type: string
 *         description: New title for the travel
 *       - name: date
 *         in: formData
 *         required: false
 *         type: date
 *         description: New content for the travel
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: New content for the travel
 *     responses:
 *       200:
 *         description: Updated travel
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Travel'
 *   delete:
 *     summary: Delete a travel by travel ID
 *     tags: [Travels]
 *     parameters:
 *       - name: travelId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Travel ID to delete
 *     responses:
 *       204:
 *         description: No Content
 */
//# sourceMappingURL=travelSwagger.js.map