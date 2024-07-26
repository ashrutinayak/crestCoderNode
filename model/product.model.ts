import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

// Define the attributes for the Product model
interface ProductAttributes {
  id: number;
  name: string;
  description: string;
  imageURL: string;
  price: number;
  quantity: number;
}

// Define the attributes that are optional (e.g., during creation)
interface ProductCreationAttributes extends Optional<ProductAttributes, "id"> {}

// Define the Product model class
class Product
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes
{
  public id!: number;
  public name!: string;
  public description!: string;
  public imageURL!: string;
  public price!: number;
  public quantity!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize the Product model
Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING
    },
    imageURL: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Products",
  }
);

export default Product;
