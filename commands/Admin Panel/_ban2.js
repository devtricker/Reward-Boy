/*CMD
  command: /ban2
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

var adm = Bot.getProperty("adminID")
var mm = User.getProperty("adminid")
Api.deleteMessage({ chat_id: chat.chatid, message_id: request.message_id })
if (user.telegramid == adm) {
  var tgi = message
  var us = Bot.getProperty("Chat" + message + "", "null")
  if (us == "null") {
    var tti =
      "*User was Not Found to Ban!! *\n\nPlease Recheck User's Telegram I'd"
    Api.editMessageText({
      message_id: mm,
      text: tti,
      parse_mode: "markdown",
      disable_web_page_preview: true,
      reply_markup: {
        inline_keyboard: [[{ text: "◀ Back", callback_data: "/user_setting" }]]
      }
    })
    return
  }

  var bnn = Bot.getProperty("Banned_Users", [])
  for (var ini in bnn) {
    var uni = bnn[ini]
    if (uni == tgi) {
      var tt = "ℹ️ Seems like User is Already Banned! "
      Api.editMessageText({
        message_id: mm,
        text: tt,
        parse_mode: "html",
        disable_web_page_preview: true,
        reply_markup: {
          inline_keyboard: [
            [{ text: "◀ Back", callback_data: "/user_setting" }]
          ]
        }
      })
      Bot.run({
        command: "/setUserChat " + message + "",
        user_id: message
      })
      return
    }
  }
  bnn.push(user.telegramid)
  Bot.setProperty("Banned_Users", bnn, "json")
  Bot.blockChat(us.id)
  Api.editMessageText({
    message_id: mm,
    text:
      "<b><a href='tg://user?id=" +
      user.telegramid +
      "'>" +
      us.user.first_name +
      "</a> Has Been Baned</>",
    parse_mode: "html",
    disable_web_page_preview: true,
    reply_markup: {
      inline_keyboard: [[{ text: "◀ Back", callback_data: "/user_setting" }]]
    }
  })
} else {
  Bot.sendMessage(" ")
}

