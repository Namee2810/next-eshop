import Products from "models/Products";
import connectDB from "utils/db";

const handler = async (req, res) => {
  if (req.method !== "POST") return;

  Products.findById(req.body.id, (err, product) => {
    if (product) res.status(200).json(product)
    else res.status(200).json({ status: 204 })
  })
};

export default connectDB(handler);