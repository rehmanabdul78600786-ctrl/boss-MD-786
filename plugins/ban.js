const fs = require('fs');
const path = require('path');
const { cmd } = require('../command'); // Bot ka command system
const { channelInfo } = require('../lib/messageConfig'); // Adjust path
const isAdmin = require('../lib/isAdmin'); // Group admin check
const { isSudo } = require('../lib/index'); // Owner/Sudo check

// Ban file path
const BANNED_PATH = path.join(__dirname, '../data/banned.json');
if (!fs.existsSync(BANNED_PATH)) fs.writeFileSync(BANNED_PATH, JSON.stringify([]));

// Utility to read/write banned users
const readBanned = () => JSON.parse(fs.readFileSync(BANNED_PATH, 'utf-8'));
const writeBanned = (data) => fs.writeFileSync(BANNED_PATH, JSON.stringify(data, null, 2));

// Ban command
cmd({
    pattern: 'ban',
    desc: 'Ban a user from using the bot',
    category: 'owner',
    react: '🔨',
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const isGroup = from.endsWith('@g.us');
        const senderId = m.sender;

        if (isGroup) {
            const { isSenderAdmin, isBotAdmin } = await isAdmin(conn, from, senderId);
            if (!isBotAdmin) return reply('Make the bot admin first!');
            if (!isSenderAdmin && !m.key.fromMe) return reply('Only group admins can ban.');
        } else {
            const senderIsSudo = await isSudo(senderId);
            if (!m.key.fromMe && !senderIsSudo) return reply('Only owner/sudo can ban in private chat.');
        }

        let userToBan = m.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] 
                        || m.message?.extendedTextMessage?.contextInfo?.participant;

        if (!userToBan) return reply('Mention or reply to a user to ban!');

        const botId = conn.user.id.split(':')[0] + '@s.whatsapp.net';
        if (userToBan === botId) return reply('Cannot ban the bot.');

        let bannedUsers = readBanned();
        if (!bannedUsers.includes(userToBan)) {
            bannedUsers.push(userToBan);
            writeBanned(bannedUsers);
            await conn.sendMessage(from, { text: `✅ Banned @${userToBan.split('@')[0]}`, mentions: [userToBan], ...channelInfo });
        } else {
            await conn.sendMessage(from, { text: `❌ @${userToBan.split('@')[0]} is already banned.`, mentions: [userToBan], ...channelInfo });
        }
    } catch (err) {
        console.error(err);
        reply('❌ Failed to ban user!');
    }
});

// Unban command
cmd({
    pattern: 'unban',
    desc: 'Unban a user',
    category: 'owner',
    react: '✅',
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        let userToUnban = m.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] 
                          || m.message?.extendedTextMessage?.contextInfo?.participant;

        if (!userToUnban) return reply('Mention or reply to a user to unban!');

        let bannedUsers = readBanned();
        if (bannedUsers.includes(userToUnban)) {
            bannedUsers = bannedUsers.filter(u => u !== userToUnban);
            writeBanned(bannedUsers);
            await conn.sendMessage(from, { text: `✅ Unbanned @${userToUnban.split('@')[0]}`, mentions: [userToUnban], ...channelInfo });
        } else {
            await conn.sendMessage(from, { text: `❌ @${userToUnban.split('@')[0]} is not banned.`, mentions: [userToUnban], ...channelInfo });
        }
    } catch (err) {
        console.error(err);
        reply('❌ Failed to unban user!');
    }
});

// Banlist command
cmd({
    pattern: 'banlist',
    desc: 'List all banned users',
    category: 'owner',
    react: '📋',
    filename: __filename
}, async (conn, mek, m, { from }) => {
    try {
        let bannedUsers = readBanned();
        if (bannedUsers.length === 0) return conn.sendMessage(from, { text: 'No banned users found.', ...channelInfo });

        let text = '📋 *Banned Users:*\n\n';
        bannedUsers.forEach((u, i) => text += `${i + 1}. @${u.split('@')[0]}\n`);

        await conn.sendMessage(from, { text, mentions: bannedUsers, ...channelInfo });
    } catch (err) {
        console.error(err);
        await conn.sendMessage(from, { text: '❌ Failed to fetch banned users.', ...channelInfo });
    }
});

