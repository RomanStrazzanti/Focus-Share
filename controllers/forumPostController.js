const supabase = require('../supabase/client');

exports.getAllPosts = async (req, res) => {
  const { data, error } = await supabase
    .from('forum_posts')
    .select('*');

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

exports.createPost = async (req, res) => {
  const { author_id, content, parent_post_id } = req.body;

  const { data, error } = await supabase
    .from('forum_posts')
    .insert([{ author_id, content, parent_post_id }])
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data);
};
