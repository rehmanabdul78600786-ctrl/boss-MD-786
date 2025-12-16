// plugins/secretmenu.js
const { cmd } = require('../command');
const config = require('../config');

// 🔑 Secret key
const SECRET_KEY = "darkshadow123"; // change if needed

cmd({
    pattern: "secretmenu",
    alias: ["smenu", "hiddenmenu"],
    react: "🔑",
    desc: "Access hidden secret menu",
    category: "hidden",
    use: ".secretmenu <key>",
    filename: __filename
}, async (conn, mek, m, {
    from,
    quoted,
    body,
    isCmd,
    command,
    args,
    q,
    isGroup,
    senderNumber,
    reply
}) => {
    try {
        // 🔐 Key required
        if (!q) {
            return await reply(
                "🔑 Enter the secret key to unlock.\nExample: `.secretmenu <key>`"
            );
        }

        const key = q.trim();

        // ❌ Wrong key & not owner
        if (key !== SECRET_KEY && senderNumber !== config.owner) {
            return await reply("🚫 Access Denied! Wrong key.");
        }

        // ✅ Correct key or owner
        await reply(
`🌌 *Secret Menu Unlocked* 🌌

🔮 *Hidden Commands*
> .godmode — Unlimited coins
> .shadowban <@user> — Secret ban
> .reveal — See hidden stats
> .vipupgrade <@user> — Make VIP
> .darkgift — Claim ultra reward

⚠️ *Keep this menu secret!*`
        );

    } catch (error) {
        console.error("SecretMenu Error:", error);
        await reply("❌ Error while opening secret menu.");
    }
});
