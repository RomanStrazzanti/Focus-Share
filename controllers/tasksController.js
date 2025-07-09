const supabase = require('../supabase/client');

// GET: Récupérer toutes les tâches de l'utilisateur connecté
exports.getTasks = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST: Créer une nouvelle tâche
exports.createTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, notes, due_date, subtasks } = req.body;

    const { data, error } = await supabase
      .from('tasks')
      .insert([
        {
          title,
          notes,
          due_date,
          subtasks: subtasks || [],
          user_id: userId,
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

// PUT: Mettre à jour une tâche
exports.updateTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const taskId = req.params.id;
    const { title, notes, due_date, completed, subtasks } = req.body;

    const { data, error } = await supabase
      .from('tasks')
      .update({
        title,
        notes,
        due_date,
        completed,
        subtasks,
      })
      .eq('id', taskId)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE: Supprimer une tâche
exports.deleteTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const taskId = req.params.id;

    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', taskId)
      .eq('user_id', userId);

    if (error) throw error;

    res.status(204).send(); // No Content
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
