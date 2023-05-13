const { SlashCommandBuilder, Client, AttachmentBuilder } = require("discord.js");
const fs = require('fs');
const ytdl = require('ytdl-core');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('yt2mp3')
        .setDescription('Download audio from YouTube')
        .addStringOption(option =>
            option.setName('url')
                .setDescription('URL of the video')
        ),
    async execute(interaction) {
        const videoUrl = interaction.options.getString('url');
        await interaction.reply("Download starting...");

        const downloadPath = 'song.mp3';

        const fileStream = fs.createWriteStream(downloadPath);
        ytdl(videoUrl, { filter: 'audioonly' })
            .pipe(fileStream);

        fileStream.on('finish', () => {
            const attachment = new AttachmentBuilder(downloadPath, { name: 'song.mp3' });
            interaction.channel.send({ files: [attachment] })
                .then(() => {
                    fs.unlink(downloadPath, (err) => {
                        if (err) {
                            console.error('Failed to delete file:', err);
                        }
                    });
                })
                .catch(console.error);
        });

        await interaction.editReply("Downloaded");
    },
};
