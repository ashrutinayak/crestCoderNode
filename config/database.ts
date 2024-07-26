import { Sequelize } from 'sequelize';

// Create a new instance of Sequelize
const sequelize = new Sequelize('crestcoder', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

export { sequelize };