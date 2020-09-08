module.exports = {
    name: "clear",
    description: "Clears messages",

    run: async (client, message, args) => {

        const amount = args.join(" ");

        if(!amount) return message.reply('Forneça uma quantidade de mensagens para eu excluir')

        if(amount > 100) return message.reply(`Você não pode limpar mais de 100 mensagens de uma vez`)

        if(amount < 1) return message.reply(`Você precisa excluir pelo menos uma mensagem`)

        await message.channel.messages.fetch({limit: amount}).then(messages => {
            message.channel.bulkDelete(messages
    )});


    message.channel.send('Clear!')

    }
}
