const express = require('express');
require('dotenv').config();
const app = express();
const port = 3000;

app.use(express.json());

// Routes
app.use('/api/profiles', require('./routes/profiles'));
app.use('/api/forum-posts', require('./routes/forumPosts'));
app.use('/api/user-settings', require('./routes/userSettings'));

app.listen(port, () => {
  console.log(`API REST Supabase dispo sur http://localhost:${port}`);
});
