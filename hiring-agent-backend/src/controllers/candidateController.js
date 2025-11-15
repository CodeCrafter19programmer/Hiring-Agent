import sheetsService from '../services/sheetsService.js';

export const list = async (req, res) => {
  const candidates = await sheetsService.getScreenedCandidates();
  res.json({ data: candidates });
};

export const stats = async (req, res) => {
  const stats = await sheetsService.getCandidateStats();
  res.json({ data: stats });
};
