const express = require('express');
const router = express.Router();
const { getSettings, updateSettings } = require('../controllers/userSettingsController');

router.get('/:user_id', getSettings);
router.put('/:user_id', updateSettings);

module.exports = router;