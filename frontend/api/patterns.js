export default function handler(req, res) {
  const patterns = {
    nodes: [
      { id: "node-1", type: "suspect", label: "Marcus Cole", danger: 0.8 },
      { id: "node-2", type: "suspect", label: "John Doe", danger: 0.95 },
      { id: "node-3", type: "suspect", label: "Elena Rostova", danger: 0.9 },
      { id: "node-4", type: "incident", label: "Downtown Bank Heist", date: "2026-07-20" },
      { id: "node-5", type: "incident", label: "Vehicle Theft (BMW)", date: "2026-07-22" },
      { id: "node-6", type: "location", label: "Safehouse - 7th St" },
      { id: "node-7", type: "vehicle", label: "Black SUV (LP: X92-LKA)" }
    ],
    edges: [
      { source: "node-1", target: "node-4", label: "Spotted at scene" },
      { source: "node-2", target: "node-4", label: "Prime Suspect" },
      { source: "node-1", target: "node-2", label: "Known Associate" },
      { source: "node-2", target: "node-6", label: "Frequent Visits" },
      { source: "node-3", target: "node-6", label: "Property Owner" },
      { source: "node-1", target: "node-5", label: "Stolen by" },
      { source: "node-5", target: "node-7", label: "Matches description" },
      { source: "node-2", target: "node-7", label: "Registered Owner" }
    ]
  };

  res.status(200).json(patterns);
}
