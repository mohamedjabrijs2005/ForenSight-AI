export default function handler(req, res) {
  const query = (req.query.q || '').toLowerCase();
  
  const searchDb = [
    { id: 'CID-99201', name: 'John Doe (Ghost)', type: 'Suspect' },
    { id: 'CAS-8921', name: 'Grand Theft Auto', type: 'Case' },
    { id: 'LOC-402', name: 'Downtown Financial District', type: 'Location' },
    { id: 'CID-44021', name: 'Marcus Cole (Snake)', type: 'Suspect' },
    { id: 'CAS-2026-001', name: 'Downtown Bank Heist', type: 'Case' }
  ];

  if (!query) {
    return res.status(200).json([]);
  }

  const results = searchDb.filter(item => 
    item.name.toLowerCase().includes(query) || 
    item.id.toLowerCase().includes(query) ||
    item.type.toLowerCase().includes(query)
  );

  res.status(200).json(results);
}
