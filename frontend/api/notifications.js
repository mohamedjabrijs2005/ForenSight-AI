export default function handler(req, res) {
  const notifications = [
    { id: 1, type: 'alert', msg: 'High priority dispatch in Sector 4', time: '2m ago' },
    { id: 2, type: 'report', msg: 'Q3 Analytics Report generated', time: '1h ago' },
    { id: 3, type: 'system', msg: 'XGBoost model retrained successfully', time: '3h ago' },
    { id: 4, type: 'alert', msg: 'Suspect John Doe flagged by CCTV at 7th St', time: 'Just now' }
  ];

  res.status(200).json(notifications);
}
