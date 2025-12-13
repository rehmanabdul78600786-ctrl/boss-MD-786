const { cmd } = require('../command');
const fetch = require('node-fetch');

const BASE = 'https://shizoapi.onrender.com/api/pies';
const VALID_COUNTRIES = ['china', 'indonesia', 'japan', 'korea', 'hijab'];

async function fetchPiesImageBuffer(country) {
    const url = `${BASE}/${country}?apikey=shizo`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('image')) throw new Error('API did not return an image');
    return res.buffer();
}

cmd({
    pattern: "pies",
    react: "🥧",
    desc: `Get pies image from: ${VALID_COUNTRIES.join(', ')}`,
    category: "fun",
    filename: __filename
}, 
async (conn, mek, m, { from, args }) => {
    const sub = (args && args[0] ? args[0].toLowerCase() : '');
    
    if (!sub) {
        return conn.sendMessage(from, { 
            text: `Usage: .pies <country>\nCountries: ${VALID_COUNTRIES.join(', ')}` 
        });
    }

    if (!VALID_COUNTRIES.includes(sub)) {
        return conn.sendMessage(from, { 
            text: `❌ Unsupported country: ${sub}. Try one of: ${VALID_COUNTRIES.join(', ')}` 
        });
    }

    try {
        const imageBuffer = await fetchPiesImageBuffer(sub);
        await conn.sendMessage(
            from,
            { image: imageBuffer, caption: `🥧 pies: ${sub}` }
        );
    } catch (err) {
        console.error('Error in pies command:', err);
        await conn.sendMessage(from, { text: '❌ Failed to fetch image. Please try again.' });
    }
});

