/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Comment management
 * definitions:
 *   Comment:
 *     type: object
 *     properties:
 *       postId:
 *         type: Schema.Types.ObjectId
 *         description: Review ID
 *       userId:
 *         type: Schema.Types.ObjectId
 *         description: User ID
 *       content:
 *         type: string
 *         description: Content
 *       userName:
 *         type: string
 *         description: User name
 *       date:
 *         type: date
 *         description: Create date
 * /comments/{reviewId}:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
 *     parameters:
 *       - name: postId
 *         in: path
 *         required: true
 *         type: Schema.Types.ObjectId
 *         description: Review ID
 *       - name: userId
 *         in: formData
 *         required: true
 *         type: Schema.Types.ObjectId
 *         description: User ID
 *       - name: content
 *         in: formData
 *         required: true
 *         type: string
 *         description: Content
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postId:
 *                 type: Schema.Types.ObjectId
 *                 description: Review ID
 *               userId:
 *                 type: Schema.Types.ObjectId
 *                 description: User ID
 *               content:
 *                 type: string
 *                 description: Content
 *     security: []
 *     responses:
 *       200:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Comment'
 *   get:
 *     summary: Get comments
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Comment'
 * /comments/{commentId}:
 *   put:
 *     summary: Update a comment
 *     tags: [Comments]
 *     parameters:
 *       - name: commentId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID to update
 *       - name: content
 *         in: formData
 *         required: false
 *         type: string
 *         description: Update content
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: Update content
 *     security:
 *       - bearerAuth: []
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
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comments]
 *     parameters:
 *       - name: commentId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID to delete
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: No Content
 */
