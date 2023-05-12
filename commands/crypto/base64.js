const {SlashCommandBuilder} = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('base64')
        .setDescription('Encodes or decodes a text')
        .addStringOption(option =>
            option.setName("text")
                .setDescription('utf8 to base64 or base64 to utf8')
        )
        .addBooleanOption(option=>
            option.setName('decode')
                .setDescription('Decode the text')
            ),
    async execute(interaction){
        const text = interaction.options.getString(`text`);
    
        const booleanOption = interaction.options.getBoolean('decode');
        if(booleanOption!=null){
            if(!booleanOption){
                const encodedText = btoa(text)
                await interaction.reply({
                    content: encodedText ,
                    ephemeral:true
                })
            }else{
                const decodedText = atob(text)
                await interaction.reply({
                    content: decodedText ,
                    ephemeral:true
                })
            }
        }else{
            const encodedText = btoa(text)
            await interaction.reply({
                content: encodedText ,
                ephemeral:true
            })
        }
    },
};