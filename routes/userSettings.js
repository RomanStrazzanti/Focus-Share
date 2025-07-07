const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate'); // Assurez-vous que le chemin est correct
const { getSettings, updateSettings } = require('../controllers/userSettingsController');

/**
 * @swagger
 * tags:
 *   name: User Settings
 *   description: Opérations liées aux paramètres utilisateur personnalisés
 */

/**
 * @swagger
 * /user-settings:
 *   get:
 *     summary: Récupère les paramètres de l'utilisateur authentifié
 *     tags: [User Settings]
 *     description: Récupère les paramètres personnalisés de l'utilisateur dont le token JWT est fourni.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Les paramètres de l'utilisateur.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserSettings'
 *       401:
 *         description: Non autorisé (token manquant ou invalide).
 *       404:
 *         description: Paramètres non trouvés pour l'utilisateur (peut déclencher une création par défaut côté serveur).
 *       500:
 *         description: Erreur serveur.
 */
router.get('/', authenticate, getSettings);

/**
 * @swagger
 * /user-settings:
 *   put:
 *     summary: Met à jour les paramètres de l'utilisateur authentifié
 *     tags: [User Settings]
 *     description: Met à jour les paramètres personnalisés de l'utilisateur dont le token JWT est fourni.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             allOf:
 *               - $ref: '#/components/schemas/UserSettings'
 *               - type: object
 *                 properties:
 *                   user_id:
 *                     readOnly: true
 *                     description: ID de l'utilisateur (extrait du token, ne pas inclure dans le body)
 *     responses:
 *       200:
 *         description: Paramètres mis à jour avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserSettings'
 *       400:
 *         description: Requête invalide (données manquantes ou format incorrect).
 *       401:
 *         description: Non autorisé (token manquant ou invalide).
 *       404:
 *         description: Paramètres non trouvés pour la mise à jour.
 *       500:
 *         description: Erreur serveur.
 */
router.put('/', authenticate, updateSettings);

module.exports = router;