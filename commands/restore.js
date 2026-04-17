const { loadData } = require("../utils/data");

module.exports = {
  name: "restore",
  async execute(message, args) {

    const password = "32167";

    if (args[0] !== password)
      return message.reply("❌ Wrong password");

    const data = loadData();
    const backup = data.backup[message.guild.id];

    if (!backup)
      return message.reply("❌ No backup found");

    for (const ch of message.guild.channels.cache.values()) {
      const oldName = backup[ch.id];

      if (oldName) {
        try {
          await ch.setName(oldName);
        } catch {}
      }
    }

    message.reply("♻ Server restored");
  }
};
