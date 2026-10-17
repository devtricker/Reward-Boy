/*CMD
  command: /send_screenshot
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Deposit
  answer: SEND SCREENSHOT PLEASE 📥🤑

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

var adminID = Bot.getProperty("adminID"); // 🔹 सही तरीके से एडमिन ID लो
if (!adminID) {
  Bot.sendMessage("❌ Admin ID not set. Please configure it first.");
  return;
}

// 🔹 अगर यूज़र ने फोटो नहीं भेजी तो Error दे दो
if (!request.photo) {
  Bot.sendMessage("❌ Please send a valid payment screenshot!");
  return;
}

// 🔹 यूज़र की डिटेल्स निकालो
var userInfo = "👤 *User Details:*\n" +
               "🔹 Name: " + user.first_name + "\n" +
               "🆔 Telegram ID: `" + user.telegramid + "`\n";

// 🔹 एडमिन को फोटो + डिटेल्स भेजो
Api.sendPhoto({
  chat_id: adminID,
  photo: request.photo[request.photo.length - 1].file_id, // 🔹 सबसे हाई-क्वालिटी इमेज चुनो
  caption: "📸 *New Payment Screenshot Received!*\n\n" + userInfo,
  parse_mode: "Markdown"
});

// 🔹 यूज़र को Confirmation Message भेजो
Bot.sendMessage("✅ *YOUR PAYMENT SCREENSHOT SEND SUCCESSFULLY!*\n\n" +
                "🛠 *ADMIN WILL REVIEW YOUR SCREENSHOT AND ADD BALANCE.*", 
                { parse_mode: "Markdown" });

