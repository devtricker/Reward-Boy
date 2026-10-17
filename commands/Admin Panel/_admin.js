/*CMD
  command: /admin
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Admin Panel

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

var mm = User.getProperty("adminid")
var adm = Bot.getProperty("adminID")
var inl = [
  [
    { text: "👤 User Setting", callback_data: "/user_setting" },
    { text: "📢 Mass Setting", callback_data: "/mass_setting" }
  ],
  [
    { text: "🛒 Task Setting", callback_data: "/alltask#123 1" },
    { text: "🤖 Bot Setting", callback_data: "/bot_setting" }
  ],
  [{ text: "🔒 Log Out", callback_data: "/logout" }]
]
if (adm == user.telegramid) {
  var tto =
    "👋 *Welcome, Here You Can Manage Your Bot With a Single Options.*\n\n_🚷 Here are Some Options You Need To Set For This bot Else Bot Won't Work Properly._\n\n*🤖 Bot Name: @" +
    bot.name +
    "*\n\n_⚠ Warning When Using This Panel Please Don't Send Any Other Command  or it May Spoil Your Work !_"
  if (request.message_id) {
    Api.deleteMessage({ chat_id: chat.chatid, message_id: request.message_id })
    Api.deleteMessage({ chat_id: chat.chatid, message_id: mm })
    Api.sendMessage({
      text: tto,
      parse_mode: "Markdown",
      on_result: "adminid",
      disable_web_page_preview: true,
      reply_markup: { inline_keyboard: inl }
    })
    return
  }
  Api.editMessageText({
    message_id: mm,
    text: tto,
    parse_mode: "markdown",
    disable_web_page_preview: true,
    reply_markup: { inline_keyboard: inl }
  })
  return
}

