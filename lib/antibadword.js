const fs = require("fs");
const path = require("path");

const DATA_PATH = path.join(__dirname, "../data/antibadword.json");

// ensure file
if (!fs.existsSync(DATA_PATH)) {
    fs.writeFileSync(DATA_PATH, JSON.stringify({}, null, 2));
}

// get group data
const getData = () => JSON.parse(fs.readFileSync(DATA_PATH));

// save data
const saveData = (data) => fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));

async function handleAntiBadwordCommand(conn, chatId, mek, match) {
    let data = getData();

    if (!data[chatId]) {
        data[chatId] = {
            enabled: false,
            words: []
        };
    }

    const group = data[chatId];
    const args = match?.split(" ") || [];
    const cmd = args[0];

    // SHOW STATUS
    if (!cmd) {
        return conn.sendMessage(chatId, {
            text:
                `🚫 *ANTI BADWORD*\n\n` +
                `Status: *${group.enabled ? "ON ✅" : "OFF ❌"}*\n` +
                `Words: ${group.words.length ? group.words.join(", ") : "None"}\n\n` +
                `Commands:\n` +
                `.antibadword on\n` +
                `.antibadword off\n` +
                `.antibadword add <word>\n` +
                `.antibadword del <word>\n` +
                `.antibadword list`
        }, { quoted: mek });
    }

    // ON
    if (cmd === "on") {
        group.enabled = true;
        data[chatId] = group;
        saveData(data);
        return conn.sendMessage(chatId, { text: "✅ AntiBadword *ENABLED*" }, { quoted: mek });
    }

    // OFF
    if (cmd === "off") {
        group.enabled = false;
        data[chatId] = group;
        saveData(data);
        return conn.sendMessage(chatId, { text: "❌ AntiBadword *DISABLED*" }, { quoted: mek });
    }

    // ADD WORD
    if (cmd === "add") {
        const word = args.slice(1).join(" ").toLowerCase();
        if (!word) return conn.sendMessage(chatId, { text: "❌ Word likho!" }, { quoted: mek });

        if (group.words.includes(word)) {
            return conn.sendMessage(chatId, { text: "⚠️ Word already added!" }, { quoted: mek });
        }

        group.words.push(word);
        saveData(data);
        return conn.sendMessage(chatId, { text: `✅ Added: *${word}*` }, { quoted: mek });
    }

    // DELETE WORD
    if (cmd === "del") {
        const word = args.slice(1).join(" ").toLowerCase();
        if (!word) return conn.sendMessage(chatId, { text: "❌ Word likho!" }, { quoted: mek });

        group.words = group.words.filter(w => w !== word);
        saveData(data);
        return conn.sendMessage(chatId, { text: `🗑 Removed: *${word}*` }, { quoted: mek });
    }

    // LIST
    if (cmd === "list") {
        return conn.sendMessage(chatId, {
            text: `📋 *Bad Words List*\n\n${group.words.length ? group.words.join("\n") : "Empty"}`
        }, { quoted: mek });
    }

    return conn.sendMessage(chatId, { text: "❌ Invalid option!" }, { quoted: mek });
}

module.exports = {
    handleAntiBadwordCommand
};
