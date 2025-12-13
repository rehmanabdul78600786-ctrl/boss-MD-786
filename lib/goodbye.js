// lib/goodbye.js
const fs = require('fs');
const path = require('path');
const { channelInfo } = require('./messageConfig'); // Make sure your messageConfig exists
const isAdmin = require('./isAdmin');
const { isGoodByeOn, getGoodbye } = require('./index');
const fetch = require('node-fetch');

// Path for storing group goodbye settings
const GOODBYE_PATH = path.join(__dirname, '../data/goodbye.json');
if (!fs.existsSync(GOODBYE_PATH)) fs.writeFileSync(GOODBYE_PATH, JSON.stringify({}));

// Command function to set goodbye message
async function goodbyeCommand(sock, chatId, message, match) {
    if (!chatId.endsWith('@g.us')) {
        await sock.sendMessage(chatId, { text: '❌ This command can only be used in groups.' });
        return;
    }

    const senderId = message.key.participant || message.key.remoteJid;
    const { isSenderAdmin } = await isAdmin(sock, chatId, senderId);

    if (!isSenderAdmin && !message.key.fromMe) {
        await sock.sendMessage(chatId, { text: '❌ Only group admins can set goodbye messages.', ...channelInfo }, { quoted: message });
        return;
    }

    let goodbyeData = JSON.parse(fs.readFileSync(GOODBYE_PATH, 'utf-8'));
    goodbyeData[chatId] = match || null;
    fs.writeFileSync(GOODBYE_PATH, JSON.stringify(goodbyeData, null, 2));

    await sock.sendMessage(chatId, { text: `✅ Goodbye message set for this group!\nMessage: ${match || "Default goodbye message"}`, ...channelInfo });
}

// Function to check if goodbye is enabled
async function isGoodbyeEnabled(chatId) {
    const goodbyeData = JSON.parse(fs.readFileSync(GOODBYE_PATH, 'utf-8'));
    return !!goodbyeData[chatId];
}

// Function to get goodbye message
async function getGoodbye(chatId) {
    const goodbyeData = JSON.parse(fs.readFileSync(GOODBYE_PATH, 'utf-8'));
    return goodbyeData[chatId] || null;
}

// Event handler when someone leaves
async function handleLeaveEvent(sock, chatId, participants) {
    const goodbyeEnabled = await isGoodbyeEnabled(chatId);
    if (!goodbyeEnabled) return;

    const customMessage = await getGoodbye(chatId);

    const groupMetadata = await sock.groupMetadata(chatId);
    const groupName = groupMetadata.subject;

    for (const participant of participants) {
        try {
            const participantId = typeof participant === 'string' ? participant : participant.id;
            const user = participantId.split('@')[0];

            const finalMessage = customMessage
                ? customMessage.replace(/{user}/g, `@${user}`).replace(/{group}/g, groupName)
                : `👋 Goodbye @${user}, we'll miss you in ${groupName}!`;

            await sock.sendMessage(chatId, { text: finalMessage, mentions: [participantId] });
        } catch (err) {
            console.error('❌ Error sending goodbye message:', err);
        }
    }
}

module.exports = { goodbyeCommand, handleLeaveEvent };

