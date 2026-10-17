/*CMD
  command: /s_wall3
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Setting

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

var m = User.getProperty("settingm");

if (!message.includes("@") || !message.includes(".")) {
  var tto = "*UPI ADDED SUCCESSFULLY ✅.*";
  Api.editMessageText({
    message_id: m,
    text: tto,
    parse_mode: "markdown",
    disable_web_page_preview: true,
    reply_markup: {
      inline_keyboard: [[{ text: "BACK 🔙", callback_data: "/wallet" }]]
    }
  });
  return;
}

var txt = "*🗂 UPI ID Set:* `" + message + "`";

var inl = [[{ text: "🔙 Back", callback_data: "⚙️ Settings" }]];
Api.editMessageText({
  message_id: m,
  text: txt,
  parse_mode: "markdown",
  disable_web_page_preview: true,
  reply_markup: { inline_keyboard: inl }
});

