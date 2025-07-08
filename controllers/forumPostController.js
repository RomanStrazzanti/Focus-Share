const supabase = require('../supabase/client');

exports.getAllPosts = async (req, res) => {
  try {
    // Récupérer tous les posts racines (parent_post_id == null)
    const { data: rootPosts, error: rootError } = await supabase
      .from('forum_posts')
      .select('*')
      .is('parent_post_id', null)
      .order('created_at', { ascending: false });

    if (rootError) return res.status(500).json({ error: rootError.message });

    // Pour chaque post racine, récupérer ses réponses
    const postsWithReplies = await Promise.all(
      rootPosts.map(async (post) => {
        const { data: replies, error: repliesError } = await supabase
          .from('forum_posts')
          .select('*')
          .eq('parent_post_id', post.id)
          .order('created_at', { ascending: true });

        if (repliesError) throw new Error(repliesError.message);

        return { ...post, replies };
      })
    );

    res.json(postsWithReplies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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