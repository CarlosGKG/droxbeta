const { MessageEmbed } = require("discord.js")
const { COLOR } = require("../../config.json");
const discord = require("discord.js");

module.exports = {
    name: "stop",
    category: "music",
    description: "Pare e descanse um pouco",
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

    if (!serverQueue) {
      embed.setAuthor("Não há nada tocando que eu possa parar")
      return message.channel.send(embed);
    }

    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
  }
};