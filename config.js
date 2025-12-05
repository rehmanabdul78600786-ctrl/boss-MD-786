const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "BOSS-MD~eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0J5VFYzbHNxTmU5dkx1ZUF1b28xT1VFbmsxM2E5WkVaNmRUQUo4NWtuWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicldIb0ExTU9aUmZRS0pVeWZjcDVyenhtdGlNNzd3b0c1dlZobkZZVTNXND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhTStrSElqYXJWalZtYVNpK1NXa0I4TXltd21NTm5USDNqREkvSitQUDE0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJYZ2JYbXdIM1BQSTNHdGVOeTE2bXlsT3BHZTZPNklIbTB1ZDVSaEo0ZkRrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlObDJBR2d3TU03eGY2MWFlNDFsREh0RnZhZUduNjRrQTAyQ0VtdjY2R289In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlZdXJUTFNNUG03RE13MFI1S2xIUkZwK2c2WW04VTl5dlRwM2laZWZtRW89In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUdZN3VaUy9qWGR6dkVCWDFUMmtpZWw2S1Uwa1hwdXpTTzZxdjl4M1AyMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ2htKzhrNTJwbTBDTXJlRzFMRjRVU1ExS0dyQ1RySmdwUCtrUFJkZkYxTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtEZ2s0NEVZaExMdTZJZ3hGam9CaEhhc3dJV0xQaEs0c2dxR0pWYU9mQk16YjZnL1ltMGo1eVBHdTBVaXgrVHVHTFhNK2ZxdTNrNURCSzhRdjdkNmdnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6OTMsImFkdlNlY3JldEtleSI6InZlUlJRaTMrbzhDbGt6NmRZeFBLb3BIVVJTd3cvRmpVeTEvYkFOcWNxR3c9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiOTIzNDg3NjkwMTcwQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkE1RUNFMzgxNUFERUMwNzk1MTI4MEMwODdFQUE5RkMyIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NjQ5NjczMzN9LHsia2V5Ijp7InJlbW90ZUppZCI6IjkyMzQ4NzY5MDE3MEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJBNTBBRUZFQTE1Nzk2M0RBRjUwN0VEMkI3NTdDNDc1OCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzY0OTY3MzM0fV0sIm5leHRQcmVLZXlJZCI6ODEzLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6ODEzLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IllVUFJBREVWIiwibWUiOnsiaWQiOiI5MjM0ODc2OTAxNzA6MzRAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiTVIgQm9zcyIsImxpZCI6IjE1MTkzNTE1NTk3MDA2MTozNEBsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0lpZndva0dFSk9IemNrR0dCRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IkVsUWJXbFFrUHo2VEFQZW5RT3FWUGgwR0JZb3Jtak52Si9vNlhFZnFEeVE9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImJsZ1dXQXFtTlJuMmhKUlUzbnBRZEY5NHVDd2FZSzVJQ2p4UmxRU0dOS29XN0FaRmpPR2FHUlE5aWZKYUw5dFBqOVdzN0FoN0RhNi9VdnVka0pRS0NBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJ1UEo2Zi80UEZ0c3d2OXd1TG9xaUdkQlRwZ2dwc2JyOHl2bnI0alZjcHhpcWtYS3pxeC9RSWN3aWRFcVc3TkNuWEtSc25Cd2VpMU1lZkphdVlkc0dodz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjkyMzQ4NzY5MDE3MDozNEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJSSlVHMXBVSkQ4K2t3RDNwMERxbFQ0ZEJnV0tLNW96YnlmNk9seEg2ZzhrIn19XSwicGxhdGZvcm0iOiJzbWJhIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQWdJRFFnQyJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NjQ5NjczMjgsImxhc3RQcm9wSGFzaCI6IjJWNzdxVSIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBSTdtIn0=",
// add your Session Id 
AUTO_STATUS_SEEN: process.env.AUTO_STATUS_SEEN || "true",
// make true or false status auto seen
AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || "false",
// make true if you want auto reply on status 
AUTO_STATUS_REACT: process.env.AUTO_STATUS_REACT || "true",
// make true if you want auto reply on status 
AUTO_STATUS_MSG: process.env.AUTO_STATUS_MSG || "*SEEN YOUR STATUS BY ×º𝓑𝖔𝙨𝙨º× 🇵🇰*",
// set the auto reply massage on status reply  
ANTI_DELETE: process.env.ANTI_DELETE || "false",
// set true false for anti delete     
ANTI_DEL_PATH: process.env.ANTI_DEL_PATH || "inbox", 
// change it to 'same' if you want to resend deleted message in same chat     
WELCOME: process.env.WELCOME || "false",
// true if want welcome and goodbye msg in groups    
ADMIN_EVENTS: process.env.ADMIN_EVENTS || "false",
// make true to know who dismiss or promoted a member in group
ANTI_LINK: process.env.ANTI_LINK || "true",
// make anti link true,false for groups 
MENTION_REPLY: process.env.MENTION_REPLY || "false",
// make true if want auto voice reply if someone menetion you 
MENU_IMAGE_URL: process.env.MENU_IMAGE_URL || "https://files.catbox.moe/5nc2am.jpg",
// add custom menu and mention reply image url
PREFIX: process.env.PREFIX || ".",
// add your prifix for bot   
BOT_NAME: process.env.BOT_NAME || "×º𝓑𝖔𝙨𝙨º×",
// add bot namw here for menu
AUTO_STATUS_REACT: process.env.AUTO_STATUS_REACT || "true",
// true to get auto status react
STICKER_NAME: process.env.STICKER_NAME || "꧁༒♛ 𝔅𝔒𝔖𝔖♛༒꧂",
// type sticker pack name 
CUSTOM_REACT: process.env.CUSTOM_REACT || "false",
// make this true for custum emoji react    
CUSTOM_REACT_EMOJIS: process.env.CUSTOM_REACT_EMOJIS || "💝,💖,💗,❤️‍🩹,❤️,🧡,💛,💚,💙,💜,🤎,🖤,🤍",
// chose custom react emojis by yourself 
DELETE_LINKS: process.env.DELETE_LINKS || "false",
// automatic delete links witho remove member 
OWNER_NUMBER: process.env.OWNER_NUMBER || "923487690170",
// add your bot owner number
OWNER_NAME: process.env.OWNER_NAME || "×º𝓑𝖔𝙨𝙨º× Official",
// add bot owner name
DESCRIPTION: process.env.DESCRIPTION || "*©𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 🔥🥀𝘽οꜱꜱ🥀🔥*",
// add bot owner name    
ALIVE_IMG: process.env.ALIVE_IMG || "https://files.catbox.moe/jcnkvf.jpg",
// add img for alive msg
LIVE_MSG: process.env.LIVE_MSG || "> I'm alive*꧁༒♛ 𝔅𝔒𝔖𝔖♛༒꧂*🇵🇰",
// add alive msg here 
READ_MESSAGE: process.env.READ_MESSAGE || "false",
// Turn true or false for automatic read msgs
AUTO_REACT: process.env.AUTO_REACT || "false",
// make this true or false for auto react on all msgs
ANTI_BAD: process.env.ANTI_BAD || "false",
// false or true for anti bad words  
MODE: process.env.MODE || "public",
// make bot public-private-inbox-group 
ANTI_LINK_KICK: process.env.ANTI_LINK_KICK || "false",
// make anti link true,false for groups 
AUTO_STICKER: process.env.AUTO_STICKER || "false",
// make true for automatic stickers 
AUTO_REPLY: process.env.AUTO_REPLY || "false",
// make true or false automatic text reply 
ALWAYS_ONLINE: process.env.ALWAYS_ONLINE || "false",
// maks true for always online 
PUBLIC_MODE: process.env.PUBLIC_MODE || "true",
// make false if want private mod
AUTO_TYPING: process.env.AUTO_TYPING || "false",
// true for automatic show typing   
READ_CMD: process.env.READ_CMD || "false",
// true if want mark commands as read 
DEV: process.env.DEV || "923487690170",
//replace with your whatsapp number        
ANTI_VV: process.env.ANTI_VV || "true",
// true for anti once view 
AUTO_RECORDING: process.env.AUTO_RECORDING || "false"
// make it true for auto recoding 
};
