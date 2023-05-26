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

bot.launch();
