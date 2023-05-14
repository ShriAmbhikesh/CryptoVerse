const { SlashCommandBuilder, Client, AttachmentBuilder, DiscordAPIError } = require("discord.js");
const fs = require('fs');
const ytdl = require('ytdl-core');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('yt2mp3')
        .setDescription('Download audio from YouTube | Do not spam, I did not keep a cooldown ☠')
        .addStringOption(option =>
            option.setName('url')
                .setDescription('URL of the video')
        ),
    async execute(interaction) {
        const videoUrl = interaction.options.getString('url');
        await interaction.reply("Download starting...");

        const info = await ytdl.getInfo(videoUrl);
        const videoTitle = info.videoDetails.title;
        const downloadPath = `${videoTitle}.mp3`;

        const fileStream = fs.createWriteStream(downloadPath);
        ytdl(videoUrl, { filter: 'audioonly' })
            .pipe(fileStream);

        fileStream.on('finish', () => {
            const attachment = new AttachmentBuilder(downloadPath, { name: `${videoTitle}.mp3` });
            interaction.channel.send({ files: [attachment] })
                .then(() => {
                    fs.unlink(downloadPath, (err) => {
                        if (err) {
                            console.error('Failed to delete file:', err);
                        }
                    });

                    interaction.editReply(`Downloaded ${videoTitle}.mp3`);
                })
                .catch(error => {
                    if (error instanceof DiscordAPIError && error.code === 40005) {
                        console.log(`Someone tried to request a large file in ${interaction.guild.name}`);
                        interaction.editReply("The file was too large. Download Aborted");
                    } else {
                        console.error('An error occurred:', error);
                    }
                  fs.unlink(downloadPath, (err) => {
                        if (err) {
                            console.error('Failed to delete file:', err);
                        }
                    });
                });
        });
    },
};
