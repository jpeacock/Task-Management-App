const Sequelize = require("sequelize");
module.exports = {
  primaryKey: ()=>({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  }),
  string: ()=>({
    type: Sequelize.STRING(1000),
  }),
  boolean: ()=>({
    type: Sequelize.BOOLEAN,
  }),
  date: ()=>({
    type: Sequelize.DATE,
  }),
  integer: ()=>({
    type: Sequelize.INTEGER,
  }),
  array: {
    integer: ()=>({
      type: Sequelize.ARRAY(Sequelize.INTEGER)
    }),
  },
  noNull: {
    string: ()=>({
      type: Sequelize.STRING(1000),

      allowNull: false,
    }),
    boolean: ()=>({
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    }),
    date: ()=>({
      allowNull: false,
      type: Sequelize.DATE,
    }),
    integer: ()=>({
      allowNull: false,
      type: Sequelize.INTEGER,
    }),
  },
  unique: {
    integer: ()=>({
      type: Sequelize.INTEGER,
      unique:true,
    }),
  }
};
