const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = 3000;
require('dotenv').config();

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerConfig'); // <-- Importe la configuration externalisée

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true // seulement si tu utilises les cookies
}));

app.use(express.json());

// Routes
app.use('/api/profiles', require('./routes/profiles'));
app.use('/api/forum-posts', require('./routes/forumPosts'));
app.use('/api/user-settings', require('./routes/userSettings'));
app.use('/api/private-messages', require('./routes/privateMessages'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
  console.log(`API REST Supabase dispo sur http://localhost:${port}`);
});
