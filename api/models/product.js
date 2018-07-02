import mongoose, { Schema } from 'mongoose';

const productSchema = Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  price: Number
});

export default mongoose.model('Product', productSchema);
