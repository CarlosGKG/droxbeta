const { MessageEmbed } = require("discord.js")

const { COLOR } = require("../../config.json");

module.exports = {
    name: "pause",
    category: "music",
    description: "Quer ir no banheiro de um pause na música",
    run: async (client, message, args) => {
  const { channel } = message.member.voice;
   let embed = new MessageEmbed()
.setColor(COLOR);

    
    if (!channel) {
      //IF AUTHOR IS NOT IN VOICE CHANNEL
      embed.setAuthor("VOCÊ PRECISA ESTAR NO CANAL DE VOZ :/")
      return message.channel.send(embed);
    }
    
    
    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      embed.setAuthor("Não há nada tocando que eu possa fazer uma pausa")
      return message.channel.send(embed);
    }
    
    if(serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
      serverQueue.connection.dispatcher.pause(true)
      
      embed.setDescription("**✅ | Pausou a música atual em execução**")
      return message.channel.send(embed)
  }  
  }
}