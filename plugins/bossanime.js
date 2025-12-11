const axios = require('axios');
const cheerio = require('cheerio');

// Function to fetch Hindi Dubbed Anime Video
async function fetchHindiDubbedAnimeVideo(animeName) {
    try {
        // Search URL for Hindi Dubbed anime on 9anime
        const searchUrl = `https://9anime.to/search?keyword=${encodeURIComponent(animeName)}&lang=hindi`;
        const response = await axios.get(searchUrl);

        // Load the HTML content using Cheerio
        const $ = cheerio.load(response.data);
        const animeLink = $('a.film-poster').first().attr('href'); // Get the first anime link from search

        if (!animeLink) {
            return { error: '❌ No video found for the given anime.' };
        }

        // Now fetch the anime episode page
        const animePage = await axios.get(`https://9anime.to${animeLink}`);
        const $$ = cheerio.load(animePage.data);

        // Ensure the video URL selector is correct
        const videoUrl = $$('video').attr('src');  // Scrape video URL
        const videoTitle = $$('h1.title').text();  // Scrape video title

        if (!videoUrl) {
            return { error: '❌ No video found on this page.' };
        }

        return { videoUrl, videoTitle }; // Return video details
    } catch (error) {
        console.error('Error fetching video:', error);
        return { error: '❌ Failed to fetch video. Please try again later.' };
    }
}

// Command registration (for plugin system)
module.exports = {
    pattern: 'anime',  // Command pattern
    desc: 'Fetch Hindi Dubbed Anime Video',  // Command description
    use: '.anime <anime name>',  // Command usage
    category: 'anime',  // Command category
    react: '🎬',  // Reaction emoji
    async execute(conn, mek, m, { from, quoted, sender, reply, args }) {
        const animeName = args.join(" ");  // Get anime name from command arguments

        if (!animeName) {
            await reply("❌ Please provide an anime name.");  // If no anime name is provided
            return;
        }

        try {
            // Fetch video URL and title
            const videoDetails = await fetchHindiDubbedAnimeVideo(animeName);

            if (videoDetails.error) {
                await reply(videoDetails.error);  // If no video is found
                return;
            }

            const responseText = `
**Anime Name**: ${animeName}
**Video Title**: ${videoDetails.videoTitle}
**Watch here**: ${videoDetails.videoUrl}  // Provide video link to user
            `;
            await conn.sendMessage(from, { text: responseText }, { quoted: mek });  // Send response message to user
        } catch (error) {
            console.error('Error in animeVideoCommand:', error);
            await reply('❌ An error occurred while fetching the anime video. Please try again later.');  // Error message
        }
    }
};
