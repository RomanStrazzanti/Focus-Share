// backend/swaggerConfig.js

const swaggerJsdoc = require('swagger-jsdoc');

const port = process.env.PORT || 3000; // Assurez-vous d'avoir accès au port ici si nécessaire

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Focus & Share Documentation',
      version: '1.0.0',
      description: 'Documentation de l\'API REST pour le projet Focus & Share, incluant la gestion des profils, posts de forum, et paramètres utilisateur.',
      contact: {
        name: 'Focus&Share Team',
        email: 'votre.email@example.com',
      },
    },
    servers: [
      {
        url: `http://localhost:${port}/api`, // Utilise la variable port
        description: 'Serveur de développement local',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Authentification JWT (jeton fourni par Supabase Auth)',
        },
      },
      schemas: {
        // Schéma pour un Post de Forum
        ForumPost: {
          type: 'object',
          properties: {
            id: { type: 'integer', description: 'ID unique du post.', example: 123 },
            author_id: { type: 'string', format: 'uuid', description: 'ID UUID de l\'auteur du post.', example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef' },
            content: { type: 'string', description: 'Contenu textuel du post.', example: 'Salut, je suis nouveau ici !' },
            parent_post_id: { type: 'integer', description: 'ID du post parent si c\'est une réponse.', nullable: true, example: null },
            created_at: { type: 'string', format: 'date-time', description: 'Date et heure de création.', example: '2025-07-07T10:00:00Z' },
            author_pseudo: { type: 'string', description: 'Pseudo de l\'auteur.', example: 'UtilisateurTest' }
          }
        },
        // Schéma pour un Profil
        Profile: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid', description: 'ID UUID du profil (lié à auth.users.id).', example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef' },
            pseudo: { type: 'string', description: 'Pseudo unique de l\'utilisateur.', example: 'MonPseudoUnique' },
            created_at: { type: 'string', format: 'date-time', description: 'Date de création du profil.', example: '2025-07-07T10:00:00Z' },
            updated_at: { type: 'string', format: 'date-time', description: 'Date de dernière mise à jour du profil.', example: '2025-07-07T11:00:00Z' }
          }
        },
        // Schéma pour les Paramètres Utilisateur
        UserSettings: {
            type: 'object',
            properties: {
                user_id: { type: 'string', format: 'uuid', description: 'ID UUID de l\'utilisateur.', example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef' },
                session_work_duration: { type: 'integer', description: 'Durée de travail Pomodoro en minutes.', example: 25 },
                session_break_duration: { type: 'integer', description: 'Durée de pause Pomodoro en minutes.', example: 5 },
                selected_ambience_sound: { type: 'string', description: 'Nom du son d\'ambiance sélectionné.', nullable: true, example: 'pluie' },
                ambience_sound_volume: { type: 'integer', description: 'Volume du son d\'ambiance (0-100).', example: 50 }
            }
        }
      }
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    './routes/*.js',
    // './controllers/*.js',
  ],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = swaggerSpec;