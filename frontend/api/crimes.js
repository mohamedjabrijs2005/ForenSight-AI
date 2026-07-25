export default function handler(req, res) {
  const crimes = [
    {
      id: "CASE-2026-001",
      title: "Downtown Bank Heist",
      status: "In Progress",
      severity: "CRITICAL",
      date: "2026-07-25T14:30:00Z",
      location: "Financial District",
      assignedTo: "Det. Smith",
      description: "Armed robbery at First National. Suspects fled in black SUV.",
      evidence: ["Security Footage", "Witness Statement", "Shell Casings"]
    },
    {
      id: "CASE-2026-002",
      title: "Vehicle Theft Ring",
      status: "Open",
      severity: "HIGH",
      date: "2026-07-24T09:15:00Z",
      location: "Westside Auto Mile",
      assignedTo: "Det. Rodriguez",
      description: "Series of high-end vehicle thefts using cloned fobs.",
      evidence: ["GPS Tracking Data", "CCTV at Dealership"]
    },
    {
      id: "CASE-2026-003",
      title: "Cyber Extortion",
      status: "Under Investigation",
      severity: "MEDIUM",
      date: "2026-07-22T11:45:00Z",
      location: "Cyber Division",
      assignedTo: "Agt. Chen",
      description: "Local hospital network locked by ransomware.",
      evidence: ["Network Logs", "Bitcoin Address", "Phishing Email"]
    },
    {
      id: "CASE-2026-004",
      title: "Warehouse Burglary",
      status: "Closed",
      severity: "LOW",
      date: "2026-07-15T02:30:00Z",
      location: "Industrial Park",
      assignedTo: "Det. Smith",
      description: "Electronics stolen from loading dock.",
      evidence: ["Recovered Goods", "Confession"]
    }
  ];

  res.status(200).json(crimes);
}
