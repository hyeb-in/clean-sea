/**
 * @swagger
 * tags:
 *   name: likes
 *   description: Likes management
 * definitions:
 *   Like:
 *     type: object
 *     properties:
 *       targetType:
 *         type: string
 *         description: select Schema
 *       targetId:
 *         type: string
 *         description: target ID
 *       userId:
 *         type: string
 *         description: user ID
 */

/**
 * @swagger
 * /api/like:
 *   post:
 *     summary: add like function
 *     tags: [likes]
 *     parameters:
 *       - name: targetType
 *         in: formData
 *         required: true
 *         type: string
 *         description: targetType (review or beach)
 *       - name: targetId
 *         in: formData
 *         required: true
 *         type: string
 *         description: targetId
 *       - name: userId
 *         in: formData
 *         required: true
 *         type: string
 *         description: user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               targetId:
 *                 type: string
 *                 description: targetId
 *               targetType:
 *                 type: string
 *                 description: targetType
 *               userId:
 *                 type: string
 *                 description: userId
 *     security: []
 *     responses:
 *       '200':
 *         description: Added
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Like'
 */
