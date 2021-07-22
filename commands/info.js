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

const info = ( message, id ) => {
	connection.query( "SELECT * FROM `warns` WHERE `id` = ?", [ id ], ( errors, results ) => {
		if ( errors ) {
			return message.reply( `ошибка базы данных.` );
		}

		let status = "Активно";

		if ( results[0].status == 1 ) {
			status = "Неактивно"
		}

		let embed = new discord.MessageEmbed()
			.setColor( "#EFA00B" )
			.setTitle( `Информация о предупреждении ${ id }` )
			.setDescription( `Чтобы получить помощь по командам, введите \`${ config.bot.prefix }Помощь\`` )
			.addFields(
				{
					name: `Выдал`,
					value: `<@!${ results[0].sender }>`
				},
				{
					name: `Получил`,
					value: `<@!${ results[0].recipient }>`
				},
				{
					name: `Комментарий`,
					value: results[0].comment
				},
				{
					name: `Статус`,
					value: status
				}
			)
			.setTimestamp();

		message.channel.send( `<@!${ results[0].recipient }>`, embed );		
	} );
}

module.exports = {
	"info": info
}