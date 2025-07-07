const supabase = require('../supabase/client');

// ✅ GET : récupérer les posts de l'utilisateur connecté
exports.getAllPosts = async (req, res) => {
  const userId = req.user.id;

  const { data, error } = await supabase
    .from('forum_posts')
    .select('*')
    .eq('author_id', userId);

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

// ✅ POST : créer un post pour l'utilisateur connecté
exports.createPost = async (req, res) => {
  const userId = req.user.id;
  const { content, parent_post_id } = req.body;

  const { data, error } = await supabase
    .from('forum_posts')
    .insert([
      {
        author_id: userId, // on ne le prend plus depuis le body
        content,
        parent_post_id: parent_post_id || null,
      },
    ])
    .select()
    .single();

  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data);
};