const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('base64')
        .setDescription('Encodes or decodes a text')
        .addStringOption(option =>
            option.setName("text")
                .setDescription('utf8 to base64 or base64 to utf8')
        )
        .addBooleanOption(option =>
            option.setName('decode')
                .setDescription('Decode the text')
        ),
    async execute(interaction) {
        const text = interaction.options.getString('text');
        const decodeOption = interaction.options.getBoolean('decode');
        
        try {
            if (decodeOption) {
                const decodedText = Buffer.from(text, 'base64').toString('utf8');
                await interaction.reply({
                    content: decodedText,
                    ephemeral: true
                });
            } else {
                const encodedText = Buffer.from(text).toString('base64');
                await interaction.reply({
                    content: encodedText,
                    ephemeral: true
                });
            }
        } catch (error) {
            if (error.message === 'The string to be decoded is not correctly encoded.') {
                await interaction.reply({
                    content: "Is this encoded properly??",
                    ephemeral: true
                });
            } else {
                const userId = '624923012113629206';
                const userMention = `<@${userId}>`;
                await interaction.reply({
                    content: `Some error occurred! Ping ${userMention}`,
                    ephemeral: true
                });
            }
        }
    },
};

