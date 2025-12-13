const { cmd } = require('../command');
const axios = require('axios');
const fetch = require('node-fetch');

cmd({
    pattern: "gpt",
    react: "🤖",
    desc: "Ask AI a question using GPT",
    category: "ai",
    filename: __filename
}, 
async (conn, mek, m, { from, args }) => {
    try {
        const query = args.join(' ').trim();
        if (!query) {
            return conn.sendMessage(from, { 
                text: "Please provide a question after .gpt\n\nExample: .gpt write a basic html code" 
            });
        }

        // Show processing reaction
        await conn.sendMessage(from, { react: { text: '🤖', key: m.key } });

        // Call GPT API
        const response = await axios.get(`https://zellapi.autos/ai/chatbot?text=${encodeURIComponent(query)}`);
        if (response.data && response.data.status && response.data.result) {
            await conn.sendMessage(from, { text: response.data.result });
        } else {
            throw new Error('Invalid response from GPT API');
        }

    } catch (error) {
        console.error('GPT Command Error:', error);
        await conn.sendMessage(from, { text: "❌ Failed to get response from GPT. Please try again later." });
    }
});

cmd({
    pattern: "gemini",
    react: "🤖",
    desc: "Ask AI a question using Gemini",
    category: "ai",
    filename: __filename
}, 
async (conn, mek, m, { from, args }) => {
    try {
        const query = args.join(' ').trim();
        if (!query) {
            return conn.sendMessage(from, { 
                text: "Please provide a question after .gemini\n\nExample: .gemini tell me a joke" 
            });
        }

        await conn.sendMessage(from, { react: { text: '🤖', key: m.key } });

        const apis = [
            `https://vapis.my.id/api/gemini?q=${encodeURIComponent(query)}`,
            `https://api.siputzx.my.id/api/ai/gemini-pro?content=${encodeURIComponent(query)}`,
            `https://api.ryzendesu.vip/api/ai/gemini?text=${encodeURIComponent(query)}`,
            `https://zellapi.autos/ai/chatbot?text=${encodeURIComponent(query)}`,
            `https://api.giftedtech.my.id/api/ai/geminiai?apikey=gifted&q=${encodeURIComponent(query)}`,
            `https://api.giftedtech.my.id/api/ai/geminiaipro?apikey=gifted&q=${encodeURIComponent(query)}`
        ];

        for (const api of apis) {
            try {
                const res = await fetch(api);
                const data = await res.json();
                const answer = data.message || data.data || data.answer || data.result;
                if (answer) {
                    return await conn.sendMessage(from, { text: answer });
                }
            } catch (e) {
                continue;
            }
        }

        throw new Error('All Gemini APIs failed');

    } catch (error) {
        console.error('Gemini Command Error:', error);
        await conn.sendMessage(from, { text: "❌ Failed to get response from Gemini AI. Please try again later." });
    }
});

