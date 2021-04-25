import Products from "models/Products";
import connectDB from "utils/db";

const handler = async (req, res) => {
  if (req.method !== "POST") return;
  const { page, perPage, query } = req.body;
  Products.find(query)
    .skip((page - 1) * perPage) //Notice here
    .limit(perPage)
    .exec((err, doc) => {
      if (err) {
        return res.json(err);
      }
      Products.countDocuments(query).exec((count_error, count) => {
        if (err) {
          return res.json(count_error);
        }
        res.json({
          total: count,
          products: doc
        });
      });
    });
};

export default connectDB(handler);