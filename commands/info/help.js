const Discord = require("discord.js");


module.exports = {
    name: "help",
    category: "info",
    aliases: ["ajuda"],
    description: "COMANDO DE AJUDA DO BOT",
    run: async (client, message, args) => {
  let embedajuda = new Discord.MessageEmbed()
  .setTitle("**AJUDA**")
  .setDescription("Ol谩, meu prefix nesse servidor 茅 `*`. Este 茅 meu centro de comandos, abaixo voc锚 poder谩 ver todos meus comandos, separados por categorias.")
  .setColor("RANDOM")
  .addField("馃懏鈥嶁檪锔� - **MODERA脟脙O**", "ban, kick, clear")
  .addField("馃搧 - **UTILIDADE**", "avatar")
  .addField("馃 - **INFORMA脟脙O**", "ping, uptime, stats, serverinfo, uptime")
  .addField("馃帶 - **M脷SICA**", "play, stop, pause, resume, queue, np, loop, skip")
    message.channel.send(embedajuda)
    }
};
