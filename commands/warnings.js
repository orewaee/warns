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

const warnings = ( message, recipient ) => {
	connection.query( "SELECT * FROM `warns` WHERE `status` = 0 AND `recipient` = ?", [ recipient ], ( errors, results ) => {
		if ( errors ) {
			return message.reply( `ошибка базы данных.` );
		}

		let warns = "";

		results.map( ( warn ) => {
			warns += `${ warn.id } `;
		} )

		let embed = new discord.MessageEmbed()
			.setColor( "#D34136" )
			.setTitle( `Список предупрежданий` )
			.setDescription( `Чтобы получить помощь по командам, введите \`${ config.prefix }Помощь\`` )
			.addFields(
				{
					name: `Пользователь`,
					value: `<@!${ results[0].recipient }>`
				},
				{
					name: `Предупреждения`,
					value: warns
				}
			)
			.setTimestamp();

		message.channel.send( `<@!${ results[0].recipient }>`, embed );
		message.delete();
		
	} );
}

module.exports = {
	"warnings": warnings
}