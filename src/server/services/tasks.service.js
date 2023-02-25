const BaseEntity = require("./base.entity.js");
const Sequelize = require("sequelize");
const modelTypes = require("../utils/modelDefinitionTypes");
module.exports = {
  name: "tasks",
  mixins: [BaseEntity],
  model: {
    name: "tasks",
    define: {
      id: modelTypes.primaryKey(),
      status: modelTypes.boolean(),
      title: modelTypes.string(),
      description: modelTypes.string(),
      priority: modelTypes.noNull.string(),
      due_date: modelTypes.noNull.date(),
      send_reminder: modelTypes.boolean(),
      createdAt: modelTypes.noNull.date(),
      updatedAt: modelTypes.noNull.date(),
      completion_date: modelTypes.date(),
    },
  },
  actions: {
    getAllTasks:{
      async handler() {
        const query = { status: true };
        const tasks = await this.adapter.find({ query });
        return tasks.map((record) => record);
      }
    },
    getTaskById:{
      async handler(ctx) {
        const id = ctx.params.id;
        const query = { id };
        const task = await this.adapter.find({ query });
        return task.map((record) => record);
      }
    },
    createTask:{
      async handler(ctx) {
        var today = new Date();
        var tomorrow = new Date();
        tomorrow.setDate(today.getDate()+1);
        const {
          status = 1, title, description, priority="Medium", due_date=tomorrow, send_reminder=false, createdAt=today, updatedAt=today, completion_date,
        } = ctx.params;
        const task = await this.adapter.insert({status, title, description, priority, due_date, send_reminder, createdAt, updatedAt, completion_date})
        return task;
      }
    },
    updateTask: {
      async handler(ctx) {
        const id = ctx.params.id;
        let task = await this.adapter.findOne({
          where: { id },
        });
        let updated = {...task.dataValues, ...ctx.params}
        return await task.update(updated, { where: { id } });
      }
    },
    deleteTask: {
      async handler(ctx) {
        const id = ctx.params.id;
        let task = await this.adapter.findOne({
          where: { id },
        });
        if (task) {
          return await task.destroy();
        }
        return false;
      }
    },
  },
};
