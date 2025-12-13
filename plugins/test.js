const { cmd } = require('../command');

cmd({
    pattern: 'test',
    desc: 'Test command',
    category: 'owner',
    react: '✅',
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    await reply('Bot is working! ✅');
});

