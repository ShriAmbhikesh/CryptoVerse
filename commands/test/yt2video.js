const {SlashCommandBuilder, Client} = require("discord.js")
//const {client} = require("../../index.js")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('yt2video')
        .setDescription('Download a video from youtube')
        .addStringOption(option=>
            option.setName('url')
                .setDescription('Url of the video')
            )
,
    async execute(interaction){
        const videoUrl = interaction
    },
};