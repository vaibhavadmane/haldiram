import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters"]
    },
    netWeight: {
    type: String,
    required: [true, "Net weight is required"],
    trim: true,
    placeholder: "e.g. 500g or 1kg"
  },
    
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"]
    },
   images: {
  type: [String],
  required: [true, "Product images are required"],
  validate: {
    validator: function(v: string[]) {
      return v && v.length > 0; // Returns true if array exists and has at least one item
    },
    message: "At least one image is required"
  },
  default: []
},
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category (Sub-category) ID is required"]
    },
    stock: {
      type: Number,
      required: [true, "Stock quantity is required"],
      min: [0, "Stock cannot be negative"],
      default: 0
    }
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);