export default function handler(req, res) {
  const thieves = [
    {
      id: "CID-99201",
      name: "John Doe",
      alias: "Ghost",
      status: "Wanted",
      threatLevel: "HIGH",
      lastKnown: { lat: 34.0522, lng: -118.2437 },
      associates: ["CID-44021", "CID-88902"],
      crimes: ["Grand Theft Auto", "Armed Robbery"],
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
      description: "Known to operate in the downtown sector. Highly evasive.",
      activeTracking: true
    },
    {
      id: "CID-44021",
      name: "Marcus Cole",
      alias: "Snake",
      status: "In Custody",
      threatLevel: "MEDIUM",
      lastKnown: { lat: 34.0410, lng: -118.2510 },
      associates: ["CID-99201"],
      crimes: ["Burglary", "Fencing"],
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80",
      description: "Operates primarily at night. Specializes in residential burglary.",
      activeTracking: false
    },
    {
      id: "CID-88902",
      name: "Elena Rostova",
      alias: "Cipher",
      status: "Under Surveillance",
      threatLevel: "HIGH",
      lastKnown: { lat: 34.0620, lng: -118.2615 },
      associates: ["CID-99201"],
      crimes: ["Cyber Fraud", "Identity Theft", "Embezzlement"],
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
      description: "White-collar criminal mastermind. Ties to international syndicates.",
      activeTracking: true
    }
  ];

  if (req.query.id) {
    const suspect = thieves.find(t => t.id === req.query.id);
    if (suspect) return res.status(200).json(suspect);
    return res.status(404).json({ error: "Suspect not found" });
  }

  res.status(200).json(thieves);
}
