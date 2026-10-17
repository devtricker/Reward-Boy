/*CMD
  command: /s_wall2
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Setting

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

Api.deleteMessage({ chat_id: chat.chatid, message_id: request.message_id });
User.setProperty("upi_id", message, "string"); 

Bot.runCommand("/s_wall3");

