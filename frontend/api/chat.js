export default function handler(req, res) {
  if (req.method === 'POST') {
    const { message } = req.body;
    let reply = "I am processing your request. My knowledge banks are currently focused on recent downtown incidents.";
    
    if (message.toLowerCase().includes("downtown anomalies")) {
      reply = "Analysis complete. I have detected a 43% increase in vehicle thefts in the financial district between 2AM and 4AM. The primary suspect node matches 'Marcus Cole'. Would you like me to flag his last known location?";
    } else if (message.toLowerCase().includes("yes") || message.toLowerCase().includes("flag")) {
      reply = "Flagging Marcus Cole's last known location (34.0410, -118.2510) to all active patrol units in Sector 4.";
    }

    return res.status(200).json({ response: reply, timestamp: new Date().toISOString() });
  }
  
  res.status(200).json({ status: "ForenSight AI Core Online" });
}
