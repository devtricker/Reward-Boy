/*CMD
  command: /private_mass_3
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

var targetID = User.getProperty("targetUserID");

if (!targetID) {
  Bot.sendMessage("⚠️ User ID not found. Please start again.");
  return;
}

// ✅ Check if the message is a photo
if (request.photo) {
  var photo = request.photo[request.photo.length - 1].file_id;
  Api.sendPhoto({
    chat_id: targetID,
    photo: photo,
    caption: "*📩 Private Message from Admin:*",
    parse_mode: "Markdown"
  });
} else {
  // ✅ Send Text Message
  Api.sendMessage({
    chat_id: targetID,
    text: "*📩 Private Message from Admin:*\n\n" + message,
    parse_mode: "Markdown"
  });
}

// ✅ Confirm to Admin
Bot.sendMessage("✅ Message sent successfully!");
