import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.json());

const TOKEN = process.env.BOT_TOKEN;
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;

// webhook endpoint
app.post("/webhook", async(req, res) => {
    const message = req.body.message;

    if (!message) return res.sendStatus(200);

    const chatId = message.chat.id;
    const text = message.text;

    let reply = "I don't understand 😅";

    if (text === "/start") {
        reply = "Welcome! Send me anything 😊";
    } else if (text.toLowerCase().includes("hi")) {
        reply = "Hello there 👋";
    } else if (text.toLowerCase().includes("how are you")) {
        reply = "I'm just a bot, but I'm fine 😄";
    }

    // send reply
    await axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id: chatId,
        text: reply,
    });

    res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});