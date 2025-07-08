const supabase = require('../supabase/client'); // ton client Supabase configuré

// Récupérer la liste des contacts (profils sauf soi-même)
exports.getContacts = async (req, res) => {
  try {
    const userId = req.user.id; // Récupérer ID user connecté depuis middleware authenticate

    const { data, error } = await supabase
      .from('profiles')
      .select('id, pseudo')
      .neq('id', userId)
      .order('pseudo');

    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Récupérer tous les messages privés entre user connecté et un contact donné
exports.getConversation = async (req, res) => {
  try {
    const userId = req.user.id;
    const contactId = req.params.contactId;

    if (!contactId) return res.status(400).json({ error: 'contactId manquant' });

    // Récupérer tous messages où (sender = userId AND receiver = contactId) OU (sender = contactId AND receiver = userId)
    const { data, error } = await supabase
      .from('private_messages')
      .select('*')
      .or(
        `and(sender_id.eq.${userId},receiver_id.eq.${contactId}),and(sender_id.eq.${contactId},receiver_id.eq.${userId})`
      )
      .order('created_at', { ascending: true });

    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Envoyer un nouveau message privé
exports.sendMessage = async (req, res) => {
  try {
    const userId = req.user.id;
    const { receiver_id, content } = req.body;

    if (!receiver_id || !content || content.trim() === '') {
      return res.status(400).json({ error: 'receiver_id et content sont obligatoires' });
    }

    const { data, error } = await supabase
      .from('private_messages')
      .insert([
        {
          sender_id: userId,
          receiver_id,
          content,
        }
      ])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
