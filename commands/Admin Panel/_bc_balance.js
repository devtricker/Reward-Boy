/*CMD
  command: /bc_balance
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

Api.editMessageText({
  message_id: User.getProperty("adminid"),
  text: "*🆔 Send This Format For Add User Balance*\n\n`telegramid-balance`",
  parse_mode: "markdown",
  disable_web_page_preview: true,
  reply_markup: {
    inline_keyboard: [[{ text: "◀ Back", callback_data: "/user_setting" }]]
  }
})
Bot.runCommand("/bc_balance2") 
