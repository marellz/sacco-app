import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    application: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LoanApplications",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      default: "active", // active, repaid, defaulted
    },
    repaidAmount: {
      type: Number,
      default: 0,
    },
    currentBalance: { // disbursed
      type: String,
      default: 0,
    },
    disbursedBalance: {
      type: Number,
      required: true,
    },
    installmentsRemaining: {
      type: Number,
      required: true,
    },
    installmentAmount: {
      type: Number,
      required: true,
    },
    lastPaymentDate: {
      type: Date,
    },
    repaidAt: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Loans", schema);
