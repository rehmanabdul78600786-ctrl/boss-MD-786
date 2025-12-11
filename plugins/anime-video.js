const axios = require('axios');
const cheerio = require('cheerio');

// Function to fetch Hindi Dubbed Anime Video
async function fetchHindiDubbedAnimeVideo(animeName) {
    try {
        // Search URL for 9anime Hindi dubbed anime
        const searchUrl = `https://9anime.to/search?keyword=${encodeURIComponent(animeName)}&lang=hindi`;
        const response = await axios.get(searchUrl);

        // Parse the HTML content using Cheerio
        const $ = cheerio.load(response.data);
        const animeLink = $('a.film-poster').first().attr('href'); // Assuming this selector works

        if (!animeLink) {
            return { error: '❌ No video found for the given anime.' };
        }

        const animePage = await axios.get(`https://9anime.to${animeLink}`);
        const $$ = cheerio.load(animePage.data);
        const videoUrl = $$('video').attr('src');
        const videoTitle = $$('h1.title').text();

        if (!videoUrl) {
            return { error: '❌ No video found on this page.' };
        }

        return { videoUrl, videoTitle };
    } catch (error) {
        console.error('Error fetching video:', error);
        return { error: '❌ Failed to fetch video. Please try again later.' };
    }
}

// Command registration (for plugin system)
module.exports = {
    pattern: 'anime',
    desc: 'Fetch Hindi Dubbed Anime Video',
    use: '.anime <anime name>',
    category: 'anime',
    react: '🎬',
    async execute(conn, mek, m, { from, quoted, sender, reply, args }) {
        const animeName = args.join(" ");

        if (!animeName) {
            await reply("❌ Please provide an anime name.");
            return;
        }

        try {
            // Fetch video URL and title
            const videoDetails = await fetchHindiDubbedAnimeVideo(animeName);

            if (videoDetails.error) {
                await reply(videoDetails.error);
                return;
            }

            const responseText = `
**Anime Name**: ${animeName}
**Video Title**: ${videoDetails.videoTitle}
**Watch here**: ${videoDetails.videoUrl}
            `;
            await conn.sendMessage(from, { text: responseText }, { quoted: mek });
        } catch (error) {
            console.error('Error in animeVideoCommand:', error);
            await reply('❌ An error occurred while fetching the anime video. Please try again later.');
        }
    }
};
