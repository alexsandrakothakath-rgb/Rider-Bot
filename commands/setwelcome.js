const { loadData, saveData } = require("../utils/data");

module.exports = {
  name: "setwelcome",
  execute(message, args) {

    const data = loadData();

    if (args[0] === "true") {
      data.welcome[message.guild.id] = true;
      saveData(data);
      return message.reply("✅ Welcome enabled");
    }

    if (args[0] === "false") {
      data.welcome[message.guild.id] = false;
      saveData(data);
      return message.reply("❌ Welcome disabled");
    }
  }
};
