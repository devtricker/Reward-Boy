/*CMD
  command: /delete
  help: 
  need_reply: false
  auto_retry_time: 
  folder: My Task

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

Api.deleteMessage({ message_id: request.message.message_id })
var bbi = Bot.getProperty("Task+" + params)
var nam = bbi.name
var admin = bbi.admin
Bot.setProperty("Status?" + nam, null)
var ad = Bot.getProperty("Tasks" + admin, [])
var to = Bot.getProperty("TaskJsonList", [])
for (var index in ad) {
  var uniqueid = ad[index]
  if (uniqueid == nam) {
    ad.splice(parseInt(index), 1)
  }
}
Bot.setProperty("Tasks" + admin, ad, "json")
for (var index in to) {
  var uniqueid = to[index].name
  if (uniqueid == nam) {
    to.splice(parseInt(index), 1)
  }
}
Bot.setProperty("TaskJsonList", to, "json")

Bot.setProperty("Task+" + nam, null)

Bot.sendMessage("*🗑 Task Successfully Deleted*") 
