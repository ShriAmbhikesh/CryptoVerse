//deploy commands to all servers

const { REST, Routes } = require('discord.js');
//const { clientId, token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');
require('dotenv').config()
const token = process.env.token;
const clientId = process.env.clientId;
const guildId = process.env.guildId;


const commands = [];
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
  
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    
    if ('data' in command && 'execute' in command) {
      commands.push(command.data.toJSON());
    } else {
      console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
  }
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);
    
    const guilds = await rest.get(Routes.userGuilds(clientId));
    
    for (const guild of guilds) {
      console.log(`Deploying commands to guild: ${guild.name} (${guild.id})`);
      
      const data = await rest.put(
        Routes.applicationGuildCommands(clientId, guild.id),
        { body: commands }
      );
      
      console.log(`Successfully deployed ${data.length} commands to guild: ${guild.name} (${guild.id})`);
    }
    
    console.log(`Successfully deployed commands to all guilds.`);
  } catch (error) {
    console.error(error);
  }
})();
