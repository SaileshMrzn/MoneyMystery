import mongoose from 'mongoose'

const expenseSchema = new mongoose.Schema(
  {
    amount: {
      type: String,
      required: [true, "Amount is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: [true, "User ID is required"],
    },
  },
  { timestamps: true }
);

const Expense = mongoose.models.expense || mongoose.model('expense', expenseSchema);

export default Expense;