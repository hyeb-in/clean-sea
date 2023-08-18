/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Review management
 * definitions:
 *   Review:
 *     type: object
 *     properties:
 *       title:
 *         type: string
 *         description: Review ID
 *       content:
 *         type: string
 *         description: Review content
 *       author:
 *         type: string
 *         description: userId
 */
/**
 * @swagger
 * /reviews/register:
 *   post:
 *     summary: Create a new review
 *     tags: [Reviews]
 *     parameters:
 *       - name: author
 *         in: path
 *         required: false
 *         schema:
 *           type: string
 *         description: userId
 *       - name: title
 *         in: formData
 *         required: true
 *         type: string
 *         description: title
 *       - name: content
 *         in: formData
 *         required: true
 *         type: string
 *         description: content
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: title
 *               content:
 *                 type: string
 *                 description: Review content
 *     responses:
 *       200:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Review'
 *       400:
 *         description: Bad Request
 */
/**
 * @swagger
 * /reviews/reviewList:
 *   get:
 *     summary: Get reviews created by the authenticated user
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: A list of reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Review'
 */
/**
 * @swagger
 * /reviews/{userId}:
 *   get:
 *     summary: Get reviews by a specific user
 *     tags: [Reviews]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID whose reviews are being retrieved
 *     responses:
 *       200:
 *         description: A list of reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Review'
 */
/**
 * @swagger
 * /reviews/{reviewId}:
 *   put:
 *     summary: Update a review by review ID
 *     tags: [Reviews]
 *     parameters:
 *       - name: reviewId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Review ID to update
 *       - name: title
 *         in: formData
 *         required: false
 *         type: string
 *         description: New title for the review
 *       - name: content
 *         in: formData
 *         required: false
 *         type: string
 *         description: New content for the review
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: New title for the review
 *               content:
 *                 type: string
 *                 description: New content for the review
 *     responses:
 *       200:
 *         description: Updated review
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                   description: Updated review title
 *                 content:
 *                   type: string
 *                   description: Updated review content
 */
/**
 * @swagger
 * /reviews/{reviewId}:
 *   delete:
 *     summary: Delete a review by review ID
 *     tags: [Reviews]
 *     parameters:
 *       - name: reviewId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Review ID to delete
 *     responses:
 *       204:
 *         description: No Content
 */ 
//# sourceMappingURL=reviewSwagger.js.map