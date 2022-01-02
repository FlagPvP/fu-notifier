const discord = require('discord.js')
const client = new discord.Client({
    intents: ['GUILD_MESSAGE_REACTIONS', 'GUILD_MEMBERS', 'GUILD_EMOJIS_AND_STICKERS'],
    partials: ['USER', 'REACTION', 'MESSAGE']
})

client.on('raw', async event => {
    if(event.t === 'MESSAGE_REACTION_ADD') {
        const channel = await client.channels.fetch(event.d.channel_id)
        const message = await channel.messages.fetch(event.d.message_id)
        notify(event.d.emoji.name, event.d.emoji.id, channel, event.d.member.user.id, event.d.member.user.username, event.d.member.user.discriminator, message)
    }
});

/**
 * 
 * @param {string} emoji 
 * @param {string} emojiId 
 * @param {discord.Channel} channel 
 * @param {string} memberId 
 * @param {string} nickname 
 * @param {string} discriminator 
 * @param {discord.Message} message 
 */
async function notify(emoji, emojiId, channel, memberId, nickname, discriminator, message) {
    if(emojiId !== null) {
        message.reactions.resolve(emojiId).remove()
    }
    if(emoji === '🖕') {
        await channel.send(`:fire::fire::fire: <@${memberId}>(${nickname}#${discriminator})님이 법규를 시전하셨습니다!!! :fire::fire::fire:`)
    }
}

client.login(require('./config.json').token).then(() => {
    console.log('Logined!')
})