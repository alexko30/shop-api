import mongoose, { Schema } from 'mongoose';

const productSchema = Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  price: { type: Number, required: true }
});

export default mongoose.model('Product', productSchema);
