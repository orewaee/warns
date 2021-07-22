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

const repost = ( message, id ) => {
	connection.query( "SELECT * FROM `warns` WHERE `id` = ?", [ id ], ( errors, results ) => {
		if ( errors ) {
			return message.reply( `ошибка базы данных.` );
		}

		if ( results[0].status == 0 ) {
			return message.reply( `это предупреждение уже активно. Чтобы получить дополнительную информацию, введите: \`${ config.prefix }Информация ${ id }\`, чтобы снять: \`${ config.prefix }Снять ${ id }\`` );
		}

		connection.query( "UPDATE `warns` SET `status` = 0 WHERE `id` = ?", [ id ], ( errors ) => {
			if ( errors ) {
				return message.reply( `ошибка базы данных.` );
			}

			let embed = new discord.MessageEmbed()
				.setColor( "#D34136" )
				.setTitle( `Перевыдано предупреждение` )
				.setDescription( `Чтобы снять, введите \`${ config.prefix }Снять ${ id }\`` )
				.addFields(
					{
						name: `Перевыдал`,
						value: `<@!${ message.author.id }>`
					},
					{
						name: `Кому перевыдали`,
						value: `<@!${ results[0].recipient }>`
					},
					{
						name: `Комментарий`,
						value: results[0].comment
					}
				)
				.setTimestamp();

			message.channel.send( `<@!${ results[0].recipient }>`, embed );
			message.delete();
		} );
	} );
}

module.exports = {
	"repost": repost
}