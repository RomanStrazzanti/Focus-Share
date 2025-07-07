const supabase = require('../supabase/client');

exports.getProfiles = async (req, res) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*');

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

exports.getProfileById = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return res.status(404).json({ error: error.message });
  res.json(data);
};
