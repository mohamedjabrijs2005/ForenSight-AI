export default function handler(req, res) {
  const cameras = [
    {
      id: "CAM-01",
      location: "Downtown Plaza",
      status: "ACTIVE",
      aiDetections: ["Person", "Vehicle", "Suspicious Bag"],
      alertLevel: "HIGH",
      feedUrl: "https://images.unsplash.com/photo-1557992260-ec58e38d363c?w=600&q=80",
      timestamp: new Date().toISOString()
    },
    {
      id: "CAM-02",
      location: "Central Station",
      status: "ACTIVE",
      aiDetections: ["Crowd Anomaly", "Unattended Item"],
      alertLevel: "MEDIUM",
      feedUrl: "https://images.unsplash.com/photo-1541888043681-37016ce3a411?w=600&q=80",
      timestamp: new Date().toISOString()
    },
    {
      id: "CAM-03",
      location: "North Highway 5",
      status: "ACTIVE",
      aiDetections: ["Speeding Vehicle", "License Plate Read"],
      alertLevel: "LOW",
      feedUrl: "https://images.unsplash.com/photo-1518241285273-030ecbc03940?w=600&q=80",
      timestamp: new Date().toISOString()
    },
    {
      id: "CAM-04",
      location: "Financial District Alley",
      status: "OFFLINE",
      aiDetections: [],
      alertLevel: "NONE",
      feedUrl: "",
      timestamp: new Date().toISOString()
    }
  ];

  res.status(200).json(cameras);
}
