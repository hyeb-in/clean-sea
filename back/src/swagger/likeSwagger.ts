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
 *       isLike:
 *         type: string
 *         enum: ['yes', 'no']
 *         description: Indicates whether the action is a like ('yes') or dislike ('no')
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
 *     responses:
 *       '200':
 *         description: Like status toggled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Result message
 */
