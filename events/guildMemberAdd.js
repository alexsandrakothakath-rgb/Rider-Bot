const { loadData } = require("../utils/data");

module.exports = {
  name: "guildMemberAdd",
  async execute(member) {

    const data = loadData();

    if (!data.welcome[member.guild.id]) return;

    for (const ch of member.guild.channels.cache.values()) {

      if (ch.isTextBased()) {
        try {
          const msg = await ch.send(
            `@everyone\nA new member called ${member} have joined our group!!`
          );

          setTimeout(() => msg.delete().catch(() => {}), 10000);

          await new Promise(r => setTimeout(r, 800));

        } catch {}
      }

    }

  }
};
