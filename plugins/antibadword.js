const { cmd } = require("../command");
const { handleAntiBadwordCommand } = require("../lib/antibadword");
const isAdminHelper = require("../lib/isAdmin");

cmd({
    pattern: "antibadword",
    alias: ["badword", "abw"],
    desc: "Enable / Disable Anti Badword System",
    category: "group",
    react: "🚫",
    filename: __filename
}, async (conn, mek, m, { from, args, isGroup, reply }) => {
    try {
        if (!isGroup) {
            return reply("❌ This command only works in groups!");
        }

        const sender = m.sender;
        const isAdmin = await isAdminHelper(conn, from, sender);

        if (!isAdmin) {
            return reply("```For Group Admins Only!```");
        }

        // get text after command
        const match = args.join(" ");

        await handleAntiBadwordCommand(conn, from, mek, match);

    } catch (err) {
        console.error("AntiBadword Error:", err);
        reply("*❌ Error processing antibadword command*");
    }
});

