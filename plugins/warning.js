const { cmd } = require('../command');
const fs = require('fs');
const path = require('path');

const warningsFilePath = path.join(__dirname, '../data/warnings.json');

function loadWarnings() {
    if (!fs.existsSync(warningsFilePath)) {
        fs.writeFileSync(warningsFilePath, JSON.stringify({}), 'utf8');
    }
    const data = fs.readFileSync(warningsFilePath, 'utf8');
    return JSON.parse(data);
}

cmd({
    pattern: "warnings",
    react: "⚠️",
    desc: "Check warnings of a user",
    category: "admin",
    filename: __filename
}, 
async (conn, mek, m, { from }) => {
    try {
        let mentionedJidList = [];

        // Check for mentioned users
        if (m.message?.extendedTextMessage?.contextInfo?.mentionedJid?.length > 0) {
            mentionedJidList = m.message.extendedTextMessage.contextInfo.mentionedJid;
        } 
        // Check for replied message
        else if (m.message?.extendedTextMessage?.contextInfo?.participant) {
            mentionedJidList = [m.message.extendedTextMessage.contextInfo.participant];
        }

        if (mentionedJidList.length === 0) {
            return conn.sendMessage(from, { text: 'Please mention a user to check warnings.' });
        }

        const userToCheck = mentionedJidList[0];
        const warnings = loadWarnings();
        const warningCount = warnings[userToCheck] || 0;

        await conn.sendMessage(from, { text: `User has ${warningCount} warning(s).` });

    } catch (error) {
        console.error('Error in warnings command:', error);
        await conn.sendMessage(from, { text: 'An error occurred while checking warnings.' });
    }
});

