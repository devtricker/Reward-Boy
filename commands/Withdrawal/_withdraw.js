/*CMD
  command: /withdraw
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Withdrawal
  answer: *📤 Enter Amount of ₹1 to Make Withdrawal*

  <<KEYBOARD

  KEYBOARD
  aliases: 🤑 withdraw
  group: 
CMD*/

var wit = Bot.getProperty("Withdraw_status");
var adm = Bot.getProperty("adminID");

// ✅ Remove "Withdrawal Off" Restriction
// अगर एडमिन नहीं है, तब भी Withdrawal Allow होगा

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

if (!isNumeric(message)) {
  Bot.sendMessage("❌ Send a Valid Number");
  Bot.runCommand("/withdraw");
  return;
}

// ✅ Minimum Withdrawal Limit (₹ में)
var minWithdrawINR = 1; // मिनिमम 10 रुपये निकासी

// ✅ Check if User is Banned
let stat = Bot.getProperty("" + user.telegramid + "?Ban");
if (stat == "ban") {
  Bot.sendMessage("*🚫 You're Banned From Using The Bot!* ❌");
  return;
}

let balance = Libs.ResourcesLib.userRes("Available_For_Payout");
var upi = User.getProperty("upi_id");

if (!upi) {
  Bot.sendMessage("*🗂 You Need To Setup Your UPI ID First!*");
  return;
}

// ✅ Withdrawal Amount Validation (Main Fix)
if (parseFloat(message) < minWithdrawINR) {
  Bot.sendMessage("⚠ *Minimum Withdrawal is ₹" + minWithdrawINR + ".*\n\n" +
  "💰 *Your Balance:* ₹" + balance.value());
  return;
}

if (balance.value() < parseFloat(message)) {
  Bot.sendMessage(
    "⚠ *You Don't Have ₹" + message + " To Withdraw!*\n\n" +
    "💰 *Your Balance:* ₹" + balance.value()
  );
  return;
}

// ✅ Deduct Balance & Process Withdrawal
balance.remove(parseFloat(message));

var requestChannel = "@DevTronexOP"; // 🔹 अपना Request Channel डालो

// ✅ Withdrawal Request को Channel पर भेजो
Api.sendMessage({
  chat_id: requestChannel,
  text:
    "🔔 *New Withdrawal Request!* 🔔\n\n" +
    "👤 *User:* [" + user.first_name + "](tg://user?id=" + user.telegramid + ")\n" +
    "🆔 *User ID:* `" + user.telegramid + "`\n" +
    "💰 *Amount:* ₹" + message + "\n" +
    "🏦 *UPI ID:* `" + upi + "`\n\n" +
    "⏳ *Processing Time:* 3 TO 4 Hours ⏳\n\n" +
    "✅ *Admin: Please Process This Request!*",
  parse_mode: "Markdown"
});

// ✅ यूज़र को कन्फर्मेशन भेजो
Bot.sendMessage(
  "✅ *Withdrawal Request Sent Successfully!* 🚀\n\n" +
  "💰 *Amount:* ₹" + message + "\n" +
  "⏳ *Please Wait 3 to 4 Hours for Approval!* ⏳\n\n" +
  "🔔 *You Will Be Notified Once Approved!*",
  { parse_mode: "Markdown" }
);

