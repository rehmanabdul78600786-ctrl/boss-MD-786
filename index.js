// index.js
import express from "express"; // Agar aap express use kar rahe ho
import { config } from "dotenv"; // Optional, Heroku pe env vars already set hain

config(); // Load .env if exists

// Check required environment variables
const requiredVars = [
  "SESSION_ID",
  "BOT_NAME",
  "OWNER_NUMBER"
];

for (const v of requiredVars) {
  if (!process.env[v]) {
    console.error(`❌ Missing required environment variable: ${v}`);
    process.exit(1); // Stop app if required env not set
  }
}

// Simple Express server (Heroku ke liye port binding)
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send(`🤖 ${process.env.BOT_NAME} is running!`);
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

// --- Bot Logic ---
// Yahan aap apna WhatsApp bot code add karen
// Example: Baileys WhatsApp client
import makeWASocket from "@whiskeysockets/baileys";

async function startBot() {
  try {
    const sock = makeWASocket({
      printQRInTerminal: true,
      auth: { creds: {} } // aapka SESSION_ID ya auth logic yahan
    });

    sock.ev.on("messages.upsert", (msg) => {
      console.log("New message:", msg);
    });

    console.log(`🤖 ${process.env.BOT_NAME} started successfully!`);
  } catch (err) {
    console.error("❌ Bot crashed:", err);
  }
}

startBot();
