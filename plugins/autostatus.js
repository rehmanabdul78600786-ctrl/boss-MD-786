const fs = require("fs");
const path = require("path");
const { cmd } = require("../command");
const isOwnerOrSudo = require("../lib/isOwner");

const CONFIG_PATH = path.join(__dirname, "../data/autoStatus.json");

// ensure config file
if (!fs.existsSync(CONFIG_PATH)) {
    fs.writeFileSync(CONFIG_PATH, JSON.stringify({
        enabled: false,
        reactOn: false
    }, null, 2));
}

// ================= COMMAND =================
cmd({
    pattern: "autostatus",
    alias: ["statusauto"],
    desc: "Enable / Disable Auto Status View & Reaction",
    category: "owner",
    react: "👁️",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    try {
        const sender = m.sender;
        const isOwner = await isOwnerOrSudo(sender);

        if (!isOwner) {
            return reply("❌ This command is only for Owner / Sudo!");
        }

        let config = JSON.parse(fs.readFileSync(CONFIG_PATH));

        // show status
        if (!args[0]) {
            return reply(
                `🔄 *AUTO STATUS SETTINGS*\n\n` +
                `👁️ Auto View: *${config.enabled ? "ON ✅" : "OFF ❌"}*\n` +
                `💚 Auto React: *${config.reactOn ? "ON ✅" : "OFF ❌"}*\n\n` +
                `📌 Commands:\n` +
                `.autostatus on\n` +
                `.autostatus off\n` +
                `.autostatus react on\n` +
                `.autostatus react off`
            );
        }

        // on / off
        if (args[0] === "on") {
            config.enabled = true;
            fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
            return reply("✅ Auto Status View *ENABLED*");
        }

        if (args[0] === "off") {
            config.enabled = false;
            fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
            return reply("❌ Auto Status View *DISABLED*");
        }

        // react on/off
        if (args[0] === "react") {
            if (!args[1]) return reply("❌ Use: `.autostatus react on/off`");

            if (args[1] === "on") {
                config.reactOn = true;
                fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
                return reply("💚 Auto Status Reaction *ENABLED*");
            }

            if (args[1] === "off") {
                config.reactOn = false;
                fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
                return reply("❌ Auto Status Reaction *DISABLED*");
            }
        }

        reply("❌ Invalid command!");

    } catch (e) {
        console.error(e);
        reply("❌ Error: " + e.message);
    }
});

// ================= HELPERS =================
const isAutoStatusEnabled = () => {
    try {
        return JSON.parse(fs.readFileSync(CONFIG_PATH)).enabled;
    } catch {
        return false;
    }
};

const isStatusReactEnabled = () => {
    try {
        return JSON.parse(fs.readFileSync(CONFIG_PATH)).reactOn;
    } catch {
        return false;
    }
};

// ================= STATUS HANDLER =================
const handleStatusUpdate = async (conn, msg) => {
    try {
        if (!isAutoStatusEnabled()) return;

        if (msg.key?.remoteJid !== "status@broadcast") return;

        await conn.readMessages([msg.key]);

        if (!isStatusReactEnabled()) return;

        await conn.relayMessage(
            "status@broadcast",
            {
                reactionMessage: {
                    key: msg.key,
                    text: "💚"
                }
            },
            {
                statusJidList: [msg.key.participant || msg.key.remoteJid]
            }
        );

    } catch (err) {
        console.log("AutoStatus Error:", err.message);
    }
};

module.exports = {
    handleStatusUpdate
};

