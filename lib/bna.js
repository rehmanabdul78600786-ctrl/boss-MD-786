const fs = require('fs');
const path = require('path');
const { channelInfo } = require('./messageConfig'); // adjust path agar zarurat ho

// Ban file ka path
const BANNED_PATH = path.join(__dirname, '../data/banned.json');

// Ensure banned.json exists
if (!fs.existsSync(BANNED_PATH)) {
    fs.writeFileSync(BANNED_PATH, JSON.stringify([]));
}

// Ban user
async function banUser(sock, chatId, message) {
    try {
        let userToBan;

        // Mentioned user
        if (message.message?.extendedTextMessage?.contextInfo?.mentionedJid?.length > 0) {
            userToBan = message.message.extendedTextMessage.contextInfo.mentionedJid[0];
        }
        // Replied message
        else if (message.message?.extendedTextMessage?.contextInfo?.participant) {
            userToBan = message.message.extendedTextMessage.contextInfo.participant;
        }

        if (!userToBan) {
            return await sock.sendMessage(chatId, { text: 'Please mention or reply to a user to ban!', ...channelInfo });
        }

        // Prevent banning the bot itself
        try {
            const botId = sock.user.id.split(':')[0] + '@s.whatsapp.net';
            if (userToBan === botId) return await sock.sendMessage(chatId, { text: 'You cannot ban the bot!', ...channelInfo });
        } catch {}

        // Read current banned users
        let bannedUsers = JSON.parse(fs.readFileSync(BANNED_PATH, 'utf-8'));

        if (!bannedUsers.includes(userToBan)) {
            bannedUsers.push(userToBan);
            fs.writeFileSync(BANNED_PATH, JSON.stringify(bannedUsers, null, 2));

            await sock.sendMessage(chatId, {
                text: `✅ Successfully banned @${userToBan.split('@')[0]}`,
                mentions: [userToBan],
                ...channelInfo
            });
        } else {
            await sock.sendMessage(chatId, {
                text: `❌ @${userToBan.split('@')[0]} is already banned`,
                mentions: [userToBan],
                ...channelInfo
            });
        }
    } catch (err) {
        console.error('Ban error:', err);
        await sock.sendMessage(chatId, { text: '❌ Failed to ban user!', ...channelInfo });
    }
}

// Unban user
async function unbanUser(sock, chatId, message) {
    try {
        let userToUnban;

        // Mentioned user
        if (message.message?.extendedTextMessage?.contextInfo?.mentionedJid?.length > 0) {
            userToUnban = message.message.extendedTextMessage.contextInfo.mentionedJid[0];
        }
        // Replied message
        else if (message.message?.extendedTextMessage?.contextInfo?.participant) {
            userToUnban = message.message.extendedTextMessage.contextInfo.participant;
        }

        if (!userToUnban) {
            return await sock.sendMessage(chatId, { text: 'Please mention or reply to a user to unban!', ...channelInfo });
        }

        // Read current banned users
        let bannedUsers = JSON.parse(fs.readFileSync(BANNED_PATH, 'utf-8'));

        if (bannedUsers.includes(userToUnban)) {
            bannedUsers = bannedUsers.filter(u => u !== userToUnban);
            fs.writeFileSync(BANNED_PATH, JSON.stringify(bannedUsers, null, 2));

            await sock.sendMessage(chatId, {
                text: `✅ Successfully unbanned @${userToUnban.split('@')[0]}`,
                mentions: [userToUnban],
                ...channelInfo
            });
        } else {
            await sock.sendMessage(chatId, {
                text: `❌ @${userToUnban.split('@')[0]} is not banned`,
                mentions: [userToUnban],
                ...channelInfo
            });
        }
    } catch (err) {
        console.error('Unban error:', err);
        await sock.sendMessage(chatId, { text: '❌ Failed to unban user!', ...channelInfo });
    }
}

// Banlist
async function banList(sock, chatId, message) {
    try {
        let bannedUsers = JSON.parse(fs.readFileSync(BANNED_PATH, 'utf-8'));

        if (bannedUsers.length === 0) {
            return await sock.sendMessage(chatId, { text: 'No banned users found.', ...channelInfo });
        }

        let listText = '📋 *Banned Users List:*\n\n';
        bannedUsers.forEach((user, i) => {
            listText += `${i + 1}. @${user.split('@')[0]}\n`;
        });

        await sock.sendMessage(chatId, { text: listText, mentions: bannedUsers, ...channelInfo });
    } catch (err) {
        console.error('Banlist error:', err);
        await sock.sendMessage(chatId, { text: '❌ Failed to fetch banned users!', ...channelInfo });
    }
}

module.exports = { banUser, unbanUser, banList };

