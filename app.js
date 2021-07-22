const discord = require( "discord.js" );
const client = new discord.Client();

const config = require( "./config.json" );

const help = require( "./commands/help" );
const add = require( "./commands/add" );
const remove = require( "./commands/remove" );
const repost = require( "./commands/repost" );
const warnings = require( "./commands/warnings" );
const info = require( "./commands/info" );

const get_recipient_id = ( message_array ) => {
	return message_array[1].replace( /<@/gi, "" ).replace( />/gi, "" ).substr( 1 );
}

client.on( "ready", () => {
	console.log( `Application launched` );
} );

client.on( "message", ( message ) => {
	if ( message.channel != config.bot.channel_id ) {
		return;
	}

	let message_array = message.content.split( " " );

	if ( !message_array[0].startsWith( config.bot.prefix ) ) {
		return;
	}

	if ( message.author.bot ) {
		return;
	}

	if ( !message.member.roles.cache.has( config.bot.role_id ) ) {
		message.delete();
		return message.reply( `у вас недостаточно прав.` );
	}

	let command = message_array[0].substr( 1 );

	switch ( command ) {
		case "Помощь":
			if ( message_array[1] ) {
				return message.reply( `эта команда не нуждается в дополнительных аругментах.` );
			}

			help.help( message );

			message.delete();
			break;

		case "Выдать":
			if ( !message_array[1] ) {
				return message.reply( `укажите пользователя.` );
			}

			if ( !message.guild.members.cache.get( get_recipient_id( message_array ) ) ) {
				return message.reply( `такого пользователя не существует.` );
			}

			if ( !message_array[2] ) {
				return message.reply( `укажите комментарий предупреждения.` );
			}

			var comment = "";
			for ( let i = 2; i < message_array.length; i++ ) {
				comment += `${ message_array[i] } `;
			}

			if ( comment.length > 256 ) {
				return message.reply( `слишком длинный комментарий.` );
			}

			add.add( message, get_recipient_id( message_array ), comment );

			message.delete();
			break;

		case "Снять":
			if ( !message_array[1] ) {
				return message.reply( `укажите идентификатор.` );
			}
			
			remove.remove( message, message_array[1] );

			message.delete();
			break;

		case "Перевыдать":
			if ( !message_array[1] ) {
				return message.reply( `укажите идентификатор.` );
			}

			repost.repost( message, message_array[1] );

			message.delete();
			break;
		
		case "Предупреждения":
			if ( !message_array[1] ) {
				return message.reply( `укажите пользователя.` );
			}

			if ( !message.guild.members.cache.get( get_recipient_id( message_array ) ) ) {
				return message.reply( `такого пользователя не существует.` );
			}

			warnings.warnings( message, get_recipient_id( message_array ) );

			message.delete();
			break;

		case "Информация":
			if ( !message_array[1] ) {
				return message.reply( `укажите идентификатор.` );
			}

			info.info( message, message_array[1] );

			message.delete();
			break;
	}
} );

client.login( config.bot.token );