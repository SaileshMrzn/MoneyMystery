import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Category name is required"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: [true, "User ID is required"],
  },
});

// Create a compound unique index on name and userId
categorySchema.index({ name: 1, userId: 1 }, { unique: true });

const Category =
  mongoose.models.category || mongoose.model("category", categorySchema);

export default Category;
