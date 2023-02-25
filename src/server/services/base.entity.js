const DbService = require("moleculer-db");
const SqlAdapter = require("moleculer-db-adapter-sequelize");

module.exports = {
  name: "base",
  version: "v1",
  mixins: [DbService],
  settings: {
    $noVersionPrefix: true,
  },
  model: {
    options: {}, //leave this here & empty (see onCreated())
  },
  adapter: new SqlAdapter(
    "guild",
    "guild",
    "guild",
    {
      host: "localhost",
      port: 5432,
      dialect: 'postgres'
    }
  ),
  created: function () {
    this.schema.model.options = this.schema.model.options || {};
    this.schema.model.options.tableName = this.schema.model.name;
    this.logger.debug(`Created ${this.fullName}`);
  },
  started: function () {
    this.logger.debug(`Started ${this.fullName}`);
  },
  stopped: function () {
    this.logger.debug(`Stopped ${this.fullName}`);
  },
};
