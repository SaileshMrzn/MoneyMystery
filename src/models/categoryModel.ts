import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Category name is required"],
    unique: [true, "Category already exists"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: [true, "User ID is required"],
  },
});

const Category =
  mongoose.models.category || mongoose.model("category", categorySchema);

export default Category;
