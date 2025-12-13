// plugins/goodbye.plugin.js
const { cmd } = require('../command'); // aapke bot ka command handler
const { goodbyeCommand, handleLeaveEvent } = require('../lib/goodbye');
const { channelInfo } = require('../lib/messageConfig');

cmd({
    pattern: 'goodbye',
    alias: ['leave-msg'],
    desc: 'Set a goodbye message for the group',
    category: 'group',
    react: '👋',
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    try {
        const text = args.join(' ');
        await goodbyeCommand(conn, from, m, text);
    } catch (err) {
        console.error('Goodbye plugin error:', err);
        reply('❌ Failed to set goodbye message.');
    }
});

// Example: To handle leave events
// Call this function in your bot's "group-participants-update" event
async function onParticipantUpdate(sock, update) {
    if (update.action === 'remove') {
        await handleLeaveEvent(sock, update.id, update.participants);
    }
}

module.exports = { onParticipantUpdate };

