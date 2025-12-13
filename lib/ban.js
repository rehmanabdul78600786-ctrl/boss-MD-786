const fs = require('fs');
const path = require('path');
const { channelInfo } = require('./messageConfig');
const isAdmin = require('./isAdmin');
const { isSudo } = require('./index');

// Ensure data directory exists
const DATA_DIR = path.join(__dirname, "../data");
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);

// Path for banned users
const BANNED_PATH = path.join(DATA_DIR, "banned.json");
if (!fs.existsSync(BANNED_PATH)) fs.writeFileSync(BANNED_PATH, JSON.stringify([]));

// ----------------- HELPERS -----------------
function getBannedUsers() {
    return JSON.parse(fs.readFileSync(BANNED_PATH, "utf-8"));
}

function saveBannedUsers(users) {
    fs.writeFileSync(BANNED_PATH, JSON.stringify(users, null, 2));
}

// ----------------- BAN FUNCTION -----------------
async function banUser(sock, chatId, message) {
    try {
        const isGroup = chatId.endsWith("@g.us");
        const senderId = message.sender;

        if (isGroup) {
            const { isSenderAdmin, isBotAdmin } = await isAdmin(sock, chatId, senderId);
            if (!isBotAdmin) return sock.sendMessage(chatId, { text: "Please make the bot an admin to use .ban", ...channelInfo }, { quoted: message });
            if (!isSenderAdmin && !message.key.fromMe) return sock.sendMessage(chatId, { text: "Only group admins can use .ban", ...channelInfo }, { quoted: message });
        } else {
            const senderIsSudo = await isSudo(senderId);
            if (!message.key.fromMe && !senderIsSudo) return sock.sendMessage(chatId, { text: "Only owner/sudo can use .ban in private chat", ...channelInfo }, { quoted: message });
        }

        let userToBan = message.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0]
                     || message.message?.extendedTextMessage?.contextInfo?.participant;

        if (!userToBan) return sock.sendMessage(chatId, { text: "Please mention the user or reply to their message to ban!", ...channelInfo }, { quoted: message });

        const botId = sock.user.id.split(":")[0] + "@s.whatsapp.net";
        if (userToBan === botId) return sock.sendMessage(chatId, { text: "You cannot ban the bot account.", ...channelInfo }, { quoted: message });

        let bannedUsers = getBannedUsers();
        if (!bannedUsers.includes(userToBan)) {
            bannedUsers.push(userToBan);
            saveBannedUsers(bannedUsers);
            await sock.sendMessage(chatId, { text: `Successfully banned @${userToBan.split("@")[0]}!`, mentions: [userToBan], ...channelInfo }, { quoted: message });
        } else {
            await sock.sendMessage(chatId, { text: `${userToBan.split("@")[0]} is already banned!`, mentions: [userToBan], ...channelInfo }, { quoted: message });
        }

    } catch (err) {
        console.error("Ban command error:", err);
        sock.sendMessage(chatId, { text: "Failed to ban user!", ...channelInfo }, { quoted: message });
    }
}

// ----------------- UNBAN FUNCTION -----------------
async function unbanUser(sock, chatId, message) {
    try {
        const isGroup = chatId.endsWith("@g.us");
        const senderId = message.sender;

        if (isGroup) {
            const { isSenderAdmin, isBotAdmin } = await isAdmin(sock, chatId, senderId);
            if (!isBotAdmin) return sock.sendMessage(chatId, { text: "Please make the bot an admin to use .unban", ...channelInfo }, { quoted: message });
            if (!isSenderAdmin && !message.key.fromMe) return sock.sendMessage(chatId, { text: "Only group admins can use .unban", ...channelInfo }, { quoted: message });
        } else {
            const senderIsSudo = await isSudo(senderId);
            if (!message.key.fromMe && !senderIsSudo) return sock.sendMessage(chatId, { text: "Only owner/sudo can use .unban in private chat", ...channelInfo }, { quoted: message });
        }

        let userToUnban = message.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0]
                       || message.message?.extendedTextMessage?.contextInfo?.participant;

        if (!userToUnban) return sock.sendMessage(chatId, { text: "Please mention the user or reply to their message to unban!", ...channelInfo }, { quoted: message });

        let bannedUsers = getBannedUsers();
        if (bannedUsers.includes(userToUnban)) {
            bannedUsers = bannedUsers.filter(u => u !== userToUnban);
            saveBannedUsers(bannedUsers);
            await sock.sendMessage(chatId, { text: `Successfully unbanned @${userToUnban.split("@")[0]}!`, mentions: [userToUnban], ...channelInfo }, { quoted: message });
        } else {
            await sock.sendMessage(chatId, { text: `${userToUnban.split("@")[0]} is not banned!`, ...channelInfo }, { quoted: message });
        }

    } catch (err) {
        console.error("Unban command error:", err);
        sock.sendMessage(chatId, { text: "Failed to unban user!", ...channelInfo }, { quoted: message });
    }
}

// ----------------- BANLIST FUNCTION -----------------
async function banList(sock, chatId, message) {
    try {
        let bannedUsers = getBannedUsers();
        if (bannedUsers.length === 0) return sock.sendMessage(chatId, { text: "No users are banned.", ...channelInfo }, { quoted: message });

        let listText = "📋 *Banned Users List:*\n\n";
        bannedUsers.forEach((user, i) => {
            listText += `${i + 1}. @${user.split("@")[0]}\n`;
        });

        await sock.sendMessage(chatId, { text: listText, mentions: bannedUsers, ...channelInfo }, { quoted: message });

    } catch (err) {
        console.error("Banlist error:", err);
        sock.sendMessage(chatId, { text: "Failed to fetch ban list!", ...channelInfo }, { quoted: message });
    }
}

module.exports = {
    banUser,
    unbanUser,
    banList
};
          
