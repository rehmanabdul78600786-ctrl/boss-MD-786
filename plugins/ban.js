// Ban command
cmd({
    pattern: 'ban',
    desc: 'Ban a user from using the bot',
    category: 'owner',
    react: '🔨',
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    await banUser(conn, from, m);
});

// Unban command
cmd({
    pattern: 'unban',
    desc: 'Unban a user from using the bot',
    category: 'owner',
    react: '🟢',
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    await unbanUser(conn, from, m);
});

// Banlist command
cmd({
    pattern: 'banlist',
    desc: 'Show all banned users',
    category: 'owner',
    react: '📋',
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    await banList(conn, from, m);
});

