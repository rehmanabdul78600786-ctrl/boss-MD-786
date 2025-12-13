const fetch = require('node-fetch');
const { cmd } = require('../command');

cmd({
    // 👇 ye line sab se important hai
    pattern: /^boss\s+anime$/i,
    desc: "Boss Anime command (anime details + links)",
    category: "search",
    react: "👑",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    try {
        if (!args.length) {
            return reply("❌ Use like:\n*boss anime Naruto*");
        }

        const query = args.join(" ");

        const res = await fetch(
            `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=1`
        );
        const json = await res.json();

        if (!json.data || !json.data.length) {
            return reply("❌ Anime not found!");
        }

        const a = json.data[0];

        const text = `
👑 *BOSS ANIME INFO*

📛 *Title:* ${a.title}
📺 *Episodes:* ${a.episodes ?? "N/A"}
📅 *Season:* ${a.season ?? "N/A"} ${a.year ?? ""}
⭐ *Score:* ${a.score ?? "N/A"}
📡 *Status:* ${a.status}
🎭 *Genres:* ${a.genres.map(g => g.name).join(", ")}

📝 *Story:*
${a.synopsis?.slice(0, 600) || "N/A"}

▶️ *Watch Links*
• Crunchyroll:
https://www.crunchyroll.com/search?q=${encodeURIComponent(a.title)}

• YouTube:
https://www.youtube.com/results?search_query=${encodeURIComponent(a.title + " anime")}
`;

        await conn.sendMessage(from, {
            image: { url: a.images.jpg.image_url },
            caption: text
        }, { quoted: mek });

    } catch (err) {
        console.error("Boss anime error:", err);
        reply("❌ Error while fetching anime");
    }
});

