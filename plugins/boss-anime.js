const { cmd } = require('../command'); // Adjust path if needed
const fetch = require('node-fetch');
const { channelInfo } = require('../lib/messageConfig');

cmd({
    pattern: 'boss',
    desc: 'Search anime details',
    category: 'search',
    react: '👑',
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    try {
        if (!args || args.length === 0) return reply('❌ Please provide an anime name!\nExample: .boss Naruto');

        const query = args.join(' ');
        await reply(`🔎 Searching anime: *${query}* ...`);

        // Jikan API
        const res = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=1`);
        const data = await res.json();

        if (!data.data || data.data.length === 0) {
            return reply(`❌ No anime found for: ${query}`);
        }

        const anime = data.data[0];

        const message = `
📌 *Title:* ${anime.title}
📅 *Aired:* ${anime.aired?.string || 'N/A'}
🎞 *Episodes:* ${anime.episodes || 'N/A'}
⭐ *Score:* ${anime.score || 'N/A'}
📺 *Type:* ${anime.type || 'N/A'}
🌐 *Link:* ${anime.url}
        `;

        // Send image + details if available
        await conn.sendMessage(from, {
            image: { url: anime.images?.jpg?.image_url || '' },
            caption: message,
            ...channelInfo
        });

    } catch (error) {
        console.error('Boss-anime plugin error:', error);
        reply('❌ Something went wrong while fetching anime!');
    }
});

