import { Request, Response } from "express";
import Product from "../../model/product.model";

const getById = async (req: Request, res: Response) => {
  try {
    let ProductData = await Product.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!ProductData) {
      return res.status(401).json({ message: "Product not found." });
    }
    return res.status(200).json({
      data: {
        ProductData,
      },
      message: "Product Details Successfully.",
    });
  } catch (error) {
    return res.status(500).json({ message: "Something was wrong" });
  }
};

const getProduct = async (req: Request, res: Response) => {
  try {
    let ProductData = await Product.findAll();
    if (!ProductData) {
      return res.status(401).json({ message: "Product not found." });
    }
    return res.status(200).json({
      data: {
        ProductData,
      },
      message: "Product Get Successfully.",
    });
  } catch (error) {
    return res.status(500).json({ message: "Something was wrong" });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    let ProductData = await Product.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!ProductData) {
      return res.status(401).json({ message: "Product not found." });
    }
    const UpdateProduct  = await Product.update({name: req.body.name, description: req.body.description, price: req.body.price, quantity: req.body.quantity }, {
        where: {
            id: req.params.id
        }
    })
    return res.status(200).json({
      data: {
        UpdateProduct,
      },
      message: "Product Update Successfully.",
    });
  } catch (error) {
    return res.status(500).json({ message: "Something was wrong" });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
    try {
        let ProductData = await Product.findOne({
          where: {
            id: req.params.id,
          },
        });
        if (!ProductData) {
          return res.status(401).json({ message: "Product not found." });
        }
        Product.destroy({
            where: {
                id: req.params.id
            }
        })
        return res.status(200).json({
          message: "Product Deleted Successfully.",
        });
      } catch (error) {
        return res.status(500).json({ message: "Something was wrong" });
      }
}

const addProduct = async (req: Request, res: Response) => {
    try{
        const { name, description, price, quantity} = req.body;
        const imagePath = req.body.file?.path;
        const productData = {
            name,
            description,
            price,
            quantity,
            imageURL: imagePath
        }
      const ProductValue =  Product.create(productData);
      return res.status(201).json({
        data: {
        ProductValue,
        },
        message: "Product Created Successfully.",
      });
    }catch (error) {
    return res.status(500).json({ message: "Something was wrong" });
  }
}
export default { getById, getProduct, deleteProduct, updateProduct, addProduct };
