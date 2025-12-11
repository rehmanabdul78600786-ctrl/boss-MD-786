const axios = require('axios');

async function animeInfoCommand(sock, chatId, message, args) {
    const animeName = args.join(" ");
    
    if (!animeName) {
        await sock.sendMessage(chatId, { text: "❌ Please provide an anime name." }, { quoted: message });
        return;
    }

    try {
        // Fetch anime info from Jikan API (MyAnimeList API)
        const response = await axios.get(`https://api.jikan.moe/v3/search/anime?q=${encodeURIComponent(animeName)}&page=1`);
        const anime = response.data.results[0];

        if (!anime) {
            await sock.sendMessage(chatId, { text: `❌ No results found for "${animeName}".` }, { quoted: message });
            return;
        }

        const animeDetails = `
**Anime Name**: ${anime.title}
**Genre**: ${anime.genres.map(g => g.name).join(", ")}
**Score**: ${anime.score}/10
**Episodes**: ${anime.episodes || "N/A"}
**Synopsis**: ${anime.synopsis}

[Watch Trailer](${anime.trailer_url})

More info: [Link to Anime](https://myanimelist.net/anime/${anime.mal_id})
`;

        // Send Anime details
        await sock.sendMessage(chatId, { text: animeDetails }, { quoted: message });

        // Send Anime Image
        await sock.sendMessage(chatId, { image: { url: anime.image_url }, caption: `Image for ${anime.title}` }, { quoted: message });
    } catch (error) {
        console.error("Error fetching anime info:", error);
        await sock.sendMessage(chatId, { text: "❌ Failed to fetch anime info." }, { quoted: message });
    }
}

module.exports = { animeInfoCommand };
