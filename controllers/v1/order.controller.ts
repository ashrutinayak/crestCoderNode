import { Request, Response } from "express";
import { Order } from "../../model";
import authenticateToken from "../../helper/jwt.helper";

const getAllOrder = async (req: Request, res: Response) => {
  try {
    let OrderData = await Order.findAll();
    if (!OrderData) {
      return res.status(401).json({ message: "Order not found." });
    }
    OrderData.filter((order) => {
        order.product = JSON.parse(order.product);
    })
    return res.status(200).json({
      data: {
        OrderData,
      },
      message: "Order Get Successfully.",
    });
  } catch (error) {
    return res.status(500).json({ message: "Something was wrong" });
  }
};

const addOder = async (req: Request, res: Response) => {
  try {
    const { product, totalPrice } = req.body;
    const authtoken = req.headers.authorization;
    const token = authtoken && authtoken.split(" ")[1];
    if (token) {
      const userId = authenticateToken.getIDFromToken(token);
      const orderData = {
        product: JSON.stringify(product),
        totalPrice,
        userId: userId.userId,
      };
      const OrderValue = Order.create(orderData);
      return res.status(201).json({
        data: {
          OrderValue,
        },
        message: "Product Created Successfully.",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something was wrong" });
  }
};

export default { getAllOrder };
