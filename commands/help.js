const discord = require( "discord.js" );

const config = require( "../config.json" );

const help = ( message ) => {
	let embed = new discord.MessageEmbed()
		.setColor( "#D34136" )
		.addFields(
			{
				name: `Выдать предупреждение`,
				value: `${ config.bot.prefix }Выдать [Пользователь] [Комментарий]`,
				inline: false
			},
			{
				name: `Снять предупреждение`,
				value: `${ config.bot.prefix }Снять [Идентификатор]`,
				inline: false
			},
			{
				name: `Перевыдать предупреждение`,
				value: `${ config.bot.prefix }Перевыдать [Идентификатор]`,
				inline: false
			},
			{
				name: `Просмотреть список предупреждений пользователя`,
				value: `${ config.bot.prefix }Предупреждения [Пользователь]`,
				inline: false
			},
			{
				name: `Просмотреть информацию о предупреждении`,
				value: `${ config.bot.prefix }Информация [Идентификатор]`,
				inline: false
			}
		);

	message.channel.send( embed );
}

module.exports = {
	"help": help
}