/**
 * @swagger
 *  tags:
 *      name: User
 *      description: User API
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     tags:
 *       - User
 *     summary: SignUp
 *     parameters:
 *       - name: name
 *         description: 이름 2자~ 20자 한글 영어 소문자 대문자 사용가능
 *         in: formData
 *         required: true
 *         type: string
 *       - name: email
 *         description: Email
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: 비밀번호 4자~ 30자, 영어 소문자 대문자 특수문자 !@#;:'-_=+,./? 사용가능
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: 회원가입 성공
 *         schema:
 *           type: object
 */

/**
 * @swagger
 * /users/:userId:
 *   get:
 *     tags:
 *       - User
 *     summary: get user info
 *     parameters:
 *       - name: userId
 *         description: user ObjectId
 *         in: path
 *         required: true
 *       - name: Authorization
 *         description: jwt Token 값
 *         in: header
 *         required: true
 *     responses:
 *       200:
 *         description: 유저정보
 *         schema:
 *           type: object
 */

/**
 * @swagger
 * /users/{id}:
 *  put:
 *      tags: [User]
 *      summary: update user info
 *  delete:
 *      tags: [User]
 *      summary: delete user
 */
