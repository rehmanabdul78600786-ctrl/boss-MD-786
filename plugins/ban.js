const { cmd } = require('../command'); // aapke bot ka command system
const { banUser, unbanUser, banList } = require('../lib/bna');

cmd({
    pattern: 'ban',
    alias: [],
    desc: 'Ban a user from using the bot',
    category: 'owner',
    react: '🔨',
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    await banUser(conn, from, m);
});

cmd({
    pattern: 'unban',
    alias: [],
    desc: 'Unban a user',
    category: 'owner',
    react: '✅',
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    await unbanUser(conn, from, m);
});

cmd({
    pattern: 'banlist',
    alias: ['banned'],
    desc: 'List all banned users',
    category: 'owner',
    react: '📋',
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    await banList(conn, from, m);
});

