const { Telegraf } = require("telegraf");
require("dotenv").config();

const TOKEN = process.env.TOKEN;
const bot = new Telegraf(TOKEN);

const web_link = process.env.WEB_LINK;

bot.start((ctx) =>
    ctx.reply("Welcome to ordering bot", {
        reply_markup: {
            keyboard: [[{ text: "Ordering app", web_app: { url: web_link } }]]
        }
    })
);

bot.help((ctx) =>
    ctx.reply("Good day! Thank you for your attention to our project. To order food through the bot, please write the command /start", {
    })
);

bot.launch();
