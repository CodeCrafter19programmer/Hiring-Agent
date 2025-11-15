import n8nService from '../services/n8nService.js';

export const triggerScreening = async (req, res) => {
  const userId = req.user.id;
  const result = await n8nService.triggerCandidateScreening('admin');
  
  if (!result.success) {
    return res.status(500).json({ 
      error: 'Failed to trigger screening workflow',
      message: result.error,
      workflowTriggered: false
    });
  }

  res.json({ 
    message: 'Candidate screening workflow triggered successfully',
    data: result
  });
};
