const supabase = require('../supabase/client');

exports.getSettings = async (req, res) => {
  const { user_id } = req.params;

  const { data, error } = await supabase
    .from('user_settings')
    .select('*')
    .eq('user_id', user_id)
    .single();

  if (error) return res.status(404).json({ error: error.message });
  res.json(data);
};

exports.updateSettings = async (req, res) => {
  const { user_id } = req.params;
  const { session_work_duration, session_break_duration, selected_ambience_sound, ambience_sound_volume } = req.body;

  const { data, error } = await supabase
    .from('user_settings')
    .update({
      session_work_duration,
      session_break_duration,
      selected_ambience_sound,
      ambience_sound_volume
    })
    .eq('user_id', user_id)
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};
