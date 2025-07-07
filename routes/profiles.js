const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate'); // Assurez-vous que le chemin est correct
const { getProfiles, getProfileById } = require('../controllers/profileController');

/**
 * @swagger
 * tags:
 *   name: Profiles
 *   description: Opérations liées aux profils utilisateurs
 */

/**
 * @swagger
 * /profiles:
 *   get:
 *     summary: Récupère tous les profils (Accès Public ou Authentifié selon RLS)
 *     tags: [Profiles]
 *     description: Récupère une liste de tous les profils utilisateurs. L'accès dépend des règles RLS définies sur Supabase (par défaut, visible publiquement).
 *     responses:
 *       200:
 *         description: Liste des profils.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Profile'
 *       500:
 *         description: Erreur serveur.
 */
router.get('/', getProfiles); // Pas de middleware authenticate si RLS permet un accès public

/**
 * @swagger
 * /profiles/me:
 *   get:
 *     summary: Récupère le profil de l'utilisateur actuellement authentifié
 *     tags: [Profiles]
 *     description: Récupère les détails du profil de l'utilisateur dont le token JWT est fourni.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Le profil de l'utilisateur authentifié.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *       401:
 *         description: Non autorisé (token manquant ou invalide).
 *       404:
 *         description: Profil non trouvé pour l'utilisateur authentifié.
 *       500:
 *         description: Erreur serveur.
 */
router.get('/me', authenticate, getProfileById); // Protégée par authenticate, utilise req.user.id

module.exports = router;