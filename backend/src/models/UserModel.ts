import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database/sequelize"; // Your Sequelize instance

// Define the TypeScript interface for User
export interface IUser {
  id: string;
  email: string;
  password: string;
  name: string;
  role: "user" | "admin";
  createdAt?: Date;
  updatedAt?: Date;
}

// Use `Optional` to define fields that are optional when creating a user
export interface IUserCreationAttributes
  extends Optional<IUser, "id" | "role" | "createdAt" | "updatedAt"> {}

// Extend Sequelize's Model class
export class User
  extends Model<IUser, IUserCreationAttributes>
  implements IUser
{
  public id!: string; // Primary key
  public email!: string; // Required field
  public password!: string; // Required field
  public name!: string; // Required field
  public role!: "user" | "admin"; // Enum field with a default value
  public readonly createdAt!: Date; // Timestamp
  public readonly updatedAt!: Date; // Timestamp
}

// Define the User schema
User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Automatically generate UUID
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, // Ensure valid email format
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("user", "admin"), // Restrict values to 'user' or 'admin'
      allowNull: false,
      defaultValue: "user",
    },
  },
  {
    sequelize, // Pass the Sequelize instance
    tableName: "users", // Table name in the database
    timestamps: true, // Automatically add createdAt and updatedAt
  }
);
