const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate'); // Assurez-vous que le chemin est correct
const { getAllPosts, createPost } = require('../controllers/forumPostController');

/**
 * @swagger
 * tags:
 *   name: Forum Posts
 *   description: Opérations liées aux posts du forum
 */

/**
 * @swagger
 * /forum-posts:
 *   get:
 *     summary: Récupère tous les posts du forum
 *     tags: [Forum Posts]
 *     description: Récupère une liste de tous les posts du forum, incluant le pseudo de l'auteur. Nécessite une authentification.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des posts du forum.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ForumPost'
 *       401:
 *         description: Non autorisé (token manquant ou invalide).
 *       500:
 *         description: Erreur serveur.
 */
router.get('/', authenticate, getAllPosts);

/**
 * @swagger
 * /forum-posts:
 *   post:
 *     summary: Crée un nouveau post dans le forum
 *     tags: [Forum Posts]
 *     description: Permet à un utilisateur authentifié de créer un nouveau post ou une réponse. L'ID de l'auteur est automatiquement extrait du token d'authentification.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 description: Le contenu textuel du post.
 *                 example: "Ceci est mon premier post sur le forum !"
 *               parent_post_id:
 *                 type: integer
 *                 description: ID du post parent si c'est une réponse (optionnel).
 *                 nullable: true
 *                 example: null
 *     responses:
 *       201:
 *         description: Post créé avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ForumPost'
 *       400:
 *         description: Données manquantes ou invalides.
 *       401:
 *         description: Non autorisé (token manquant ou invalide).
 *       500:
 *         description: Erreur serveur.
 */
router.post('/', authenticate, createPost);

module.exports = router;