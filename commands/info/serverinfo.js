const { MessageEmbed } = require('discord.js');
const moment = require('moment');

const filterLevels = {
	DISABLED: 'Off',
	MEMBERS_WITHOUT_ROLES: 'Nenhuma role',
	ALL_MEMBERS: 'Everyone'
};

const verificationLevels = {
	NONE: 'Nenhum',
	LOW: 'Baixo',
	MEDIUM: 'Médio',
	HIGH: '(╯°□°）╯︵ ┻━┻',
	VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
};

const regions = {
	brazil: 'Brazil',
	europe: 'Europe',
	hongkong: 'Hong Kong',
	india: 'India',
	japan: 'Japan',
	russia: 'Russia',
	singapore: 'Singapore',
	southafrica: 'South Africa',
	sydeny: 'Sydeny',
	'us-central': 'US Central',
	'us-east': 'US East',
	'us-west': 'US West',
	'us-south': 'US South'
};

module.exports = {
    name: "serverinfo",
    category: "info",
    aliases: ["server", "guild", "guildinfo"],
    description: "Pegar informações do servidor",
    run: async (client, message, args) => {
		const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
		const members = message.guild.members.cache;
		const channels = message.guild.channels.cache;
		const emojis = message.guild.emojis.cache;

		const embed = new MessageEmbed()
			.setDescription(`**Guild information for __${message.guild.name}__**`)
			.setColor('BLUE')
			.setThumbnail(message.guild.iconURL({ dynamic: true }))
			.addField('Geral', [
				`**❯ Nome:** ${message.guild.name}`,
				`**❯ ID:** ${message.guild.id}`,
				`**❯ Proprietário:** ${message.guild.owner.user.tag} (${message.guild.ownerID})`,
				`**❯ Região:** ${regions[message.guild.region]}`,
				`**❯ Nível de impulso:** ${message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : 'None'}`,
				`**❯ Filtro Explícito:** ${filterLevels[message.guild.explicitContentFilter]}`,
				`**❯ Nível de verificação:** ${verificationLevels[message.guild.verificationLevel]}`,
				`**❯ Tempo criado:** ${moment(message.guild.createdTimestamp).format('LT')} ${moment(message.guild.createdTimestamp).format('LL')} ${moment(message.guild.createdTimestamp).fromNow()}`,
				'\u200b'
			])
			.addField('Estatisticas', [
				`**❯ Contagem de Funções:** ${roles.length}`,
				`**❯ Contagem de Emoji:** ${emojis.size}`,
				`**❯ Contagem Regular de Emoji:** ${emojis.filter(emoji => !emoji.animated).size}`,
				`**❯ Contagem de Emoji Animada:** ${emojis.filter(emoji => emoji.animated).size}`,
				`**❯ Contagem de membro:** ${message.guild.memberCount}`,
				`**❯ Humanos:** ${members.filter(member => !member.user.bot).size}`,
				`**❯ Bots:** ${members.filter(member => member.user.bot).size}`,
				`**❯ Canais de texto:** ${channels.filter(channel => channel.type === 'text').size}`,
				`**❯ Canais de voz:** ${channels.filter(channel => channel.type === 'voice').size}`,
				`**❯ Contagem de impulso:** ${message.guild.premiumSubscriptionCount || '0'}`,
				'\u200b'
			])
			.addField('Presença', [
				`**❯ Online:** ${members.filter(member => member.presence.status === 'online').size}`,
				`**❯ Ocioso:** ${members.filter(member => member.presence.status === 'idle').size}`,
				`**❯ Não perturbe:** ${members.filter(member => member.presence.status === 'dnd').size}`,
				`**❯ Offline:** ${members.filter(member => member.presence.status === 'offline').size}`,
				'\u200b'
			])
			.setTimestamp();
		message.channel.send(embed);
	}

};
