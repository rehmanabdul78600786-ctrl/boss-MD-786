const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "animeinfo",
    react: "🎬",
    desc: "Get full anime details by name",
    category: "fun",
    filename: __filename
}, 
async (conn, mek, m, { from, args }) => {
    try {
        const query = args.join(' ');
        if (!query) {
            return await conn.sendMessage(from, { text: '❌ Please provide an anime name.\n\nExample: .animeinfo Naruto' }, { quoted: m });
        }

        // Call Anime API
        const url = `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=1`;
        const response = await axios.get(url);
        const data = response.data.data[0];

        if (!data) {
            return await conn.sendMessage(from, { text: `❌ No results found for "${query}"` }, { quoted: m });
        }

        const title = data.title;
        const synopsis = data.synopsis || 'No description available';
        const episodes = data.episodes || 'N/A';
        const score = data.score || 'N/A';
        const status = data.status || 'N/A';
        const genres = data.genres.map(g => g.name).join(', ') || 'N/A';
        const poster = data.images.jpg.large_image_url;

        const caption = `🎬 *${title}*\n\n` +
                        `📝 Synopsis: ${synopsis}\n` +
                        `📺 Episodes: ${episodes}\n` +
                        `⭐ Score: ${score}\n` +
                        `📍 Status: ${status}\n` +
                        `🎭 Genres: ${genres}`;

        await conn.sendMessage(from, { image: { url: poster }, caption, quoted: m });

    } catch (err) {
        console.error('Anime info error:', err);
        await conn.sendMessage(from, { text: '❌ Failed to fetch anime info. Try again later.' }, { quoted: m });
    }
});

