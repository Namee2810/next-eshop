import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  rate: {
    type: Number,
    required: true
  },
  type: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
});

export default mongoose.models.products || mongoose.model('products', ProductSchema);