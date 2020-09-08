const { Client, Collection } = require('discord.js');
const fs = require('fs');
const mongoose = require('mongoose');
const { prefix, token } = require("./config.json");
const client = new Client({
    disableEveryone: true
});

// Collections
client.commands = new Collection();
client.aliases = new Collection();
client.queue = new Map();
client.vote = new Map();
client.mongoose = require('./database/database');

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

// Run the command loader
["command"].forEach(handler => {
    require(`./system/${handler}`)(client);
});

client.on("message", async message => {
   

    if (message.author.bot) return;
    if (!message.guild) return;
    if (message.content.startsWith(`<@${client.user.id}>`) || message.content.startsWith(`<@!${client.user.id}`)) return message.reply("Olá meu nome é **DroxBETA** e meu prefixo é `*`");
    if (!message.content.startsWith(prefix)) return;
    
    // If message.member is uncached, cache it.
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    // Get the command
    let command = client.commands.get(cmd);
    // If none is found, try to find it by alias
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    // If a command is finally found, run the command
    if (command) 
        command.run(client, message, args);
});


client.on("ready", () =>{
    let activities = [
      `Utilize ${prefix}help para obter ajuda`,
      `${client.guilds.cache.size} servidores!`,
      `${client.channels.cache.size} canais!`,
      `${client.users.cache.size} usuários!`
    ],
    i = 0;
  setInterval( () => client.user.setActivity(`${activities[i++ % activities.length]}`, {
        type: "STREAMING"
      }), 7000); 
  client.user
      .setStatus("online")
      .catch(console.error);
    console.log(`Logando...\nBot: ${client.user.tag}.\nServidores: ${client.guilds.cache.size} servidores.\nUsuarios: ${client.users.cache.size} usuários.\nBot Logado com sucesso.`);
});

client.mongoose.init()
client.login(token);