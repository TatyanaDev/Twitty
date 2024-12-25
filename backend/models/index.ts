const { Sequelize, DataTypes, Model } = require("sequelize");
const path = require("path");
const fs = require("fs");

const env: string = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];

const basename: string = path.basename(__filename);

const db: { [key: string]: typeof Model } = {};

let sequelize: typeof Sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable]!, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname)
  .filter((file: string) => file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".ts")
  .forEach((file: string) => {
    const model = require(path.join(__dirname, file)).default(sequelize, DataTypes);

    db[model.name] = model;
  });

Object.keys(db).forEach((modelName: string) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
