const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate'); // middleware auth JWT / session

const {
  getContacts,
  getConversation,
  sendMessage,
} = require('../controllers/privateMessagesController');

router.use(authenticate);

// Liste des contacts
router.get('/contacts', getContacts);

// Récupérer conversation avec un contact
router.get('/:contactId', getConversation);

// Envoyer un message
router.post('/', sendMessage);

module.exports = router;