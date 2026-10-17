/*CMD
  command: /deposit
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Statistics
  answer: *PLEASE ENTER YOUR DEPOSIT AMOUNT. MIN AMOUNT IS ₹5*.

  <<KEYBOARD

  KEYBOARD
  aliases: ➕ deposit
  group: 
CMD*/

var amount = parseFloat(message); // यूज़र द्वारा टाइप किया गया अमाउंट
var upiID = "vipboy07@ybl"; // तुम्हारा UPI ID
var imageURL = "https://files.catbox.moe/by7c0i.jpg"; // अपने QR Code की लिंक डालो

// ✅ अगर यूज़र ₹10 से कम डिपॉज़िट करता है, तो वॉर्निंग देगा
if (amount < 5) {
  Bot.sendMessage("❌ *Minimum deposit amount is ₹5. Please enter ₹ or more.*");
  return;
}

// ✅ QR Code + Deposit Details भेजो
var text = "🏳️ New Deposit\n\n" +
           "🚀 Amount: ₹ " + amount + "\n\n" +
           "🌿 SEND PAYMENT SCREENSHOT ✔️\n\n" +
           "🥇 COPY UPI ID AND PAY : " + upiID + "\n\n" +
           "💠 After Paying Click On 'SEND PAYMENT SCREENSHOT'";

// ✅ Inline keyboard for sending payment screenshot
var inline_keyboard = [[
  { text: "📸 SEND PAYMENT SCREENSHOT", callback_data: "/send_screenshot" }
]];

// ✅ QR Code भेजो + बाकी Deposit Details
Api.sendPhoto({
  chat_id: user.telegramid,
  photo: imageURL, // 🔹 Direct image link used
  caption: text,
  parse_mode: "Markdown",
  reply_markup: { inline_keyboard: inline_keyboard }
});

