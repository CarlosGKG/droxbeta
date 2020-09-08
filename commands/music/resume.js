const { MessageEmbed } = require("discord.js")

const { COLOR } = require("../../config.json");


module.exports = {
  name: "resume", 
  description: "Retomar a música atual em reprodução",
  run: async (client, message, args) => {
    let embed = new MessageEmbed()
.setColor(COLOR);

      const { channel } = message.member.voice;
      
    if (!channel) {
      //IF AUTHOR IS NOT IN VOICE CHANNEL
      embed.setAuthor("VOCÊ PRECISA ESTAR NO CANAL DE VOZ :/")
      return message.channel.send(embed);
    }

    const serverQueue = message.client.queue.get(message.guild.id);
 if(serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume()
  embed.setAuthor("✅ | Reiniciou a música em pausa")
  return message.channel.send(embed)
 }
    embed.setDescription("Não há nada em pausa que eu possa retomar")
    message.channel.send(embed)
    
  }
}