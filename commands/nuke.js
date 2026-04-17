const { loadData, saveData } = require("../utils/data");

module.exports = {
  name: "nuke",
  async execute(message, args) {

    const password = "32167";

    if (args[0] !== password)
      return message.reply("❌ Wrong password");

    const data = loadData();

    data.backup[message.guild.id] = {};

    message.guild.channels.cache.forEach(ch => {
      data.backup[message.guild.id][ch.id] = ch.name;
    });

    saveData(data);

    message.reply("⚠ Type !nuke confirm");

  }
};
