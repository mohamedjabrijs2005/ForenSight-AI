export default function handler(req, res) {
  const patrols = [
    {
      id: "UNIT-1A",
      type: "Interceptor",
      status: "En Route",
      officers: ["Off. Davis", "Off. Miller"],
      location: { lat: 34.0522, lng: -118.2437, address: "400 S Hope St" },
      assignment: "Respond to 10-31 in progress",
      eta: "2 mins",
      callSign: "Alpha-1",
      batteryLevel: 85
    },
    {
      id: "UNIT-2B",
      type: "K9 Unit",
      status: "On Scene",
      officers: ["Off. Martinez", "K9 Rex"],
      location: { lat: 34.0410, lng: -118.2510, address: "7th & Fig" },
      assignment: "Perimeter sweep",
      eta: "Arrived",
      callSign: "Bravo-2",
      batteryLevel: 92
    },
    {
      id: "UNIT-3C",
      type: "Air Support",
      status: "Available",
      officers: ["Pilot Reynolds"],
      location: { lat: 34.0620, lng: -118.2615, address: "Airborne Sector 4" },
      assignment: "Routine patrol over downtown",
      eta: "N/A",
      callSign: "Air-3",
      batteryLevel: 100
    },
    {
      id: "UNIT-4D",
      type: "Tactical",
      status: "En Route",
      officers: ["Sgt. O'Connor", "Off. Chen", "Off. Smith"],
      location: { lat: 34.0450, lng: -118.2450, address: "Grand Ave" },
      assignment: "High-risk warrant execution backup",
      eta: "4 mins",
      callSign: "Delta-4",
      batteryLevel: 100
    }
  ];

  res.status(200).json(patrols);
}
