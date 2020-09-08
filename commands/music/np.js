const { MessageEmbed } = require("discord.js")

const { COLOR } = require("../../config.json");

module.exports = {
  name: "np",
  description: "Obter o nome da música atual",
  run: async (client, message, args) => {
    let embed = new MessageEmbed()
.setColor(COLOR)
      
    const { channel } = message.member.voice;
    if (!channel) {
      //IF AUTHOR IS NOT IN VOICE CHANNEL
      embed.setAuthor("VOCÊ PRECISA ESTAR NO CANAL DE VOZ :/")
      return message.channel.send(embed);
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      embed.setAuthor("Bot não está tocando nada")
      return message.channel.send(embed);
    }
    
    embed.setDescription(`**REPRODUZINDO AGORA** - ${serverQueue.songs[0].title}`)
    .setThumbnail(serverQueue.songs[0].thumbnail)
    message.channel.send(embed)

    
    
    
  }
}