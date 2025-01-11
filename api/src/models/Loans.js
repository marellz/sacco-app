import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      default: "active", // active, repaid, defaulted
    },
    duration: {
      type: Number,
      required: true,
    },
    durationUnit: {
      type: String, // days, weeks, months, years
      default: "months",
      required: true,
    },
    interestAmount: {
      type: Number,
      required: true,
    },
    interestRate: {
      type: Number,
      required: true,
    },
    repaidAmount: {
      type: Number,
      default: 0,
    },
    currentBalance: {
      type: String,
      default: 0,
    },
    disbursedBalance: {
      type: Number,
      required: true,
    },
    remainingBalance: {
      type: Number,
      required: true,
    },
    application: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LoanApplications",
    },
    repaymentFrequency: {
      type: Number,
      required: true,
    },
    repaymentAmount: {
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
