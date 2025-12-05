const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "BOSS-MD~eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0lscjdNeDk3dnhMM3RFZnNmWndPQTZScUYvV1ZCMzZPanBxcStUaGQxND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib01xRFZYb29nQ3Q3aDNhRmdQT09XOHhaRlBHSVduMFdDYUNtOUhTSXlCND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhTVJCL1ptc3dhRUNqbmMyNGc5V0N4cXl4VEczTkM5NkEzV2pTeHRnY0VJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFTHh0NHkwK1F2ZmMwWWlQcWhQNWdaZEMyaUlwUjJjbFcvQ2JoWTZ2d0gwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNOSUlBc0V2L0EwcTdZeVN6MmZQYWZDenRoUTJxdlQyc25Nd2owVVU3M1U9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkErbzVrSFV6WVJkbndFZ1hvWGVCZnNTczdvMnVYT3I2aE1tbWNkcDBGQU09In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUJYVmZ2UFBQdDRYalZabTdHWkJwUFY0dDRCbkQ2Y2MxQ0xuRVRUcUFGbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiN2lNdVlPcVFlY25Zb2pEMTh5L0FzUy9IaUlTYkI4a0dzVkRBcHFJRk5sST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ijg1Qi94Nm1nTUVaemJWNnRQblRYRVRyN0w5emVtcnk3V3NWWllzM1phcFBjcXdiNkh0QTB5bXhXM0lEL3JQcFk0WU04aVZKM1NuZHhXSHNNM3FJWmh3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTYxLCJhZHZTZWNyZXRLZXkiOiIxaUczbXNOQ2txTXJHT2xnOEhCUnFOa3Y4bk1iZ29lNEtoNTRnK1hEcUJzPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjkyMzA3NjQxMTA5OUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJBQzZGQTNBMkIxMEU2QUQ2NEZCMzA2QkJDRDdCRjFFOCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzY0OTcyMDAzfSx7ImtleSI6eyJyZW1vdGVKaWQiOiI5MjMwNzY0MTEwOTlAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQUMzMDgwRDFCMDkwM0REMTM2QkQ1NzZBNEJCNEREODUifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc2NDk3MjAwM30seyJrZXkiOnsicmVtb3RlSmlkIjoiOTIzMDc2NDExMDk5QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkFDQjFFOURGMUY3MTEyMDNEMzg2NDVDQjk1RDhBODNEIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NjQ5NzIwMDR9LHsia2V5Ijp7InJlbW90ZUppZCI6IjkyMzA3NjQxMTA5OUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJBQ0QzM0FEMDVFRjgxMDBCNUNCMDExNTQ5MkY0QzFDQSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzY0OTcyMDA1fV0sIm5leHRQcmVLZXlJZCI6ODEzLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6ODEzLCJhY2NvdW50U3luY0NvdW50ZXIiOjIsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IllVUFJBREVWIiwibWUiOnsiaWQiOiI5MjMwNzY0MTEwOTk6MTFAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiIxNjg0MTA1ODM0MDA2ODU6MTFAbGlkIiwibmFtZSI6IkJvc3MifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ1Bqb2xMNEVFTk9yemNrR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IkJ2ZjFsNDhlU04xMWRsZnhRWWwxc2pjUHhCRjBaV1dDdWNFMTdaWnFFR0E9IiwiYWNjb3VudFNpZ25hdHVyZSI6IlROZzFGdjR1Sm03VHE3NGo1MGZndTRqdnY1dkUyd0UyNXg0cnZ6N0hhKzNxZlFtQ3NLSStHbjUwckpMWkhBdWJud2RrQXFldmhxRGMrK3l4SXpXZkRBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiIvaEd3QngxY3VkbllrN2cySmh3R1RERDY1MkhubWo1UW8xRjNDMmNEbWRZNzRIcGpmdkx4Uy9UQ0ZEKzNCRHQ1Mk13SlNoR1puZG9na2ZjQWpJN3hoUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjkyMzA3NjQxMTA5OToxMUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJRYjM5WmVQSGtqZGRYWlg4VUdKZGJJM0Q4UVJkR1ZsZ3JuQk5lMldhaEJnIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQTBJRWdnSSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NjQ5NzE5OTksImxhc3RQcm9wSGFzaCI6IjNSOVozOSIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBR2hGIn0=",
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
