const discord = require( "discord.js" );
const mysql = require( "mysql" );

const config = require( "../config.json" );

var connection = mysql.createConnection( {
	"host": config.mysql.host,
	"user": config.mysql.user,
	"password": config.mysql.password,
	"database": config.mysql.database

} );

connection.connect();

const remove = ( message, id ) => {

	connection.query( "SELECT * FROM `warns` WHERE `id` = ?", [ id ], ( errors, results ) => {
		if ( errors ) {
			return message.reply( `ошибка базы данных.` );
		}

		if ( results[0].status == 1 ) {
			return message.reply( `это предупреждение уже снято. Чтобы получить дополнительную информацию, введите: \`${ config.bot.prefix }Информация ${ id }\`` );
		}

		connection.query( "UPDATE `warns` SET `status` = 1 WHERE `id` = ?", [ id ], ( errors ) => {
			if ( errors ) {
				return message.reply( `ошибка базы данных.` );
			}

			let embed = new discord.MessageEmbed()
				.setColor( "#EFA00B" )
				.setTitle( `Снято предупреждение` )
				.setDescription( `Чтобы перевыдать, введите \`${ config.bot.prefix }Перевыдать ${ id }\`` )
				.addFields(
					{
						name: `Снял`,
						value: `<@!${ message.author.id }>`
					},
					{
						name: `У кого сняли`,
						value: `<@!${ results[0].recipient }>`
					},
					{
						name: `Комментарий`,
						value: results[0].comment
					}
				)
				.setTimestamp();

			message.channel.send( `<@!${ results[0].recipient }>`, embed );
		} );
	} );
}

module.exports = {
	"remove": remove
}