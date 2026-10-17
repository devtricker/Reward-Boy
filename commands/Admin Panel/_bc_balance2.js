/*CMD
  command: /bc_balance2
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Admin Panel

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

Api.deleteMessage({ chat_id: chat.chatid, message_id: request.message_id });

var splt = message.split("-");
var tgid = splt[0]; // यूज़र का Telegram ID
var am = splt[1]; // बैलेंस अमाउंट
var mm = User.getProperty("adminid"); 
var us = Bot.getProperty("Chat" + tgid, null);

if (us == null) {
  Api.editMessageText({
    message_id: mm,
    text:
      "*User was Not Found to Add Balance!! *\n\nPlease Recheck User's Telegram ID",
    parse_mode: "markdown",
    disable_web_page_preview: true,
    reply_markup: {
      inline_keyboard: [[{ text: "◀ Back", callback_data: "/user_setting" }]]
    }
  });
  return;
}

let bal = Libs.ResourcesLib.anotherUserRes("balance", tgid);
bal.add(+am);

// 🔹 एडमिन को कन्फर्मेशन भेजो
Api.editMessageText({
  message_id: mm,
  text: "✅ *Balance Added Successfully!*",
  parse_mode: "markdown",
  disable_web_page_preview: true,
  reply_markup: {
    inline_keyboard: [[{ text: "◀ Back", callback_data: "/user_setting" }]]
  }
});

// 🔹 यूज़र को बैलेंस ऐड होने का मैसेज भेजो
Bot.sendMessageToChatWithId(tgid, 
  "🎉 *Congratulations!* 🎉\n\n" +
  "💰 *Your balance has been credited successfully!* \n\n" +
  "🔹 *Added Amount:* ₹" + am + "\n" +
  "🔹 *Total Balance:* ₹" + bal.value() + "\n\n" +
  "🚀 *Enjoy using our bot!*",
  { parse_mode: "markdown" }
);

