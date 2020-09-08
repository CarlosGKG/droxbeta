const { MessageEmbed } = require("discord.js")
const { COLOR } = require("../../config.json");



module.exports = {
  name: "stats",
  description: "Obtenha as informações detalhadas do bot",
  run: async (client, message, args) => {
    
    let embed = new MessageEmbed()
    .setColor(COLOR)
    .setThumbnail(client.user.displayAvatarURL())
    .setAuthor(`ESTATÍSTICAS E INFORMAÇÕES`, client.user.displayAvatarURL())
    .setDescription(`Meu nome é **${client.user.username}** e meu trabalho é tocar música`)
    .addField("SERVIDORES", client.guilds.cache.size, true)
    .addField("ID", client.user.id, true)
    .addField("STATUS", client.user.presence.status, true)
    .addField("TOTAL DE MEMBROS", client.users.cache.size)
    message.channel.send(embed)
  }
};
