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

const add = ( message, recipient, comment ) => {
	connection.query( "INSERT INTO `warns` ( `recipient`, `sender`, `comment` ) VALUES ( ?, ?, ? )", [ recipient, message.author.id, comment ], ( errors, results ) => {
		if ( errors ) {
			return message.reply( `ошибка базы данных.` );
		}

		let embed = new discord.MessageEmbed()
			.setColor( "#D34136" )
			.setTitle( `Выдано предупреждение` )
			.setDescription( `Чтобы снять, введите \`${ config.bot.prefix }Снять ${ results.insertId }\`` )
			.addFields(
				{
					name: `Выдал`,
					value: `<@!${ message.author.id }>`
				},
				{
					name: `Кому выдали`,
					value: `<@!${ recipient }>`
				},
				{
					name: `Комментарий`,
					value: comment
				}
			)
			.setTimestamp();

		message.channel.send( `<@!${ recipient }>`, embed );
	} );	
}

module.exports = {
	"add": add
}