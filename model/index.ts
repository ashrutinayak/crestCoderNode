import User from './user.model';
import Order from './order.model';

// Define associations
User.hasMany(Order, { foreignKey: 'userId', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'userId', as: 'users' });

export { User, Order };