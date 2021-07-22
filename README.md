# Discord bot for minecraft server - NDS
[Node.js](https://nodejs.org/) version - 14.15.4

[npm](https://www.npmjs.com/) version - 6.14.10

### Modules used
Here are all the modules that were used in the project.
- [Discord.js](https://discord.js.org/) - library for creating discord bots
- [mysql](https://www.npmjs.com/package/mysql) - library for interacting with the mysql database
- [nodemon](https://www.npmjs.com/package/nodemon) - library to facilitate the development process

### Installation
- Download the source code of the project
- Install the required modules by typing the command `npm install`
- Create and configure a `config.json` file

Structure for the `config.json` file:

```json
{	
  "bot": {
    "prefix": "!",
    "token": "token",
    "role_id": "role_id",
    "channel_id": 21
  },	
  "mysql": {
    "host": "host",
    "user": "user",
    "password": "password",
    "database": "database"
  }
}
```

|Key       |Type    |Description                                                     |
|:---------|:-------|:---------------------------------------------------------------|
|prefix    |`string`|Indicates a prefix for commands                                 |
|token     |`string`|Secret token to launch the bot                                  |
|role_id   |`string`|Role ID for which commands will be available                    |
|channel_id|`number`|The id of the text channel in which the commands will be allowed|
|host      |`string`|The host on which the mysql database is located                 |
|user      |`string`|Mysql database user                                             |
|password  |`string`|Mysql database user password                                    |
|database  |`string`|Mysql database name                                             |

- Run the application by typing the command `node app.js`
