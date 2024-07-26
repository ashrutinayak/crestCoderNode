import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import User from './user.model'; // Import the User model

// Define the attributes for the Order model
interface OrderAttributes {
  id: number;
  userId: number;
  product: string;
  totalPrice: number;
}

// Define the attributes that are optional (e.g., during creation)
interface OrderCreationAttributes extends Optional<OrderAttributes, 'id'> {}

// Define the Order model class
class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  public id!: number;
  public userId!: number;
  public product!: string;
  public totalPrice!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize the Order model
Order.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User, // Reference the User model
      key: 'id',
    },
  },
  product: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  totalPrice: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Orders',
});

// Define associations
Order.belongsTo(User, { foreignKey: 'userId', as: 'user' }); // An order belongs to a user

export default Order;