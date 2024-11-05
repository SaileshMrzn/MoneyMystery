import mongoose from 'mongoose'

const expenseSchema = new mongoose.Schema({
  amount: {
    type: String,
    required: [true, "Amount is required"],
  },
  category: {
    type: String,
    required: [true, "Category is required"],
  },
}, {timestamps:true});

const Expense = mongoose.models.expense || mongoose.model('expense', expenseSchema);

export default Expense;