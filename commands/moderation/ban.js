const discord = require("discord.js");

module.exports = {
  name: "ban",
  category: "moderation",
  description: "Banir qualquer pessoa com um tiro sem conhecer ninguém xD",
  usage: "ban <@user> <reason>",
  run: async (client, message, args) => {
    
    if(!message.member.hasPermission("BAN_MEMBERS")) {
      return message.channel.send(`**${message.author.username}**, Você não tem permissões para banir alguém`)
    }
    
    if(!message.guild.me.hasPermission("BAN_MEMBERS")) {
      return message.channel.send(`**${message.author.username}**, Eu sou não tenho permissões para banir alguém`)
    }
    
    const target = message.mentions.members.first();
    
    if(!target) {
      return message.channel.send(`**${message.author.username}**, Mencione a pessoa que você deseja banir.`)
    }
    
    if(target.id === message.author.id) {
      return message.channel.send(`**${message.author.username}**, Você não pode se banir!`)
    }
    
   
    
   if(!args[1]) {
     return message.channel.send(`**${message.author.username}**, Indique o motivo para proibir o membro`)
   }
    
    let embed = new discord.MessageEmbed()
    .setTitle("Action : Banimento")
    .setDescription(`Banido ${target} (${target.id})`)
    .setColor("#ff2050")
    .setThumbnail(target.avatarURL)
    .setFooter(`Banido por ${message.author.tag}`);
    
    message.channel.send(embed)
    target.ban(args[1])
    
    
    
  }
}
