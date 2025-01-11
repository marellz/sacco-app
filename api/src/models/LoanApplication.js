import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "draft", // drafted, pending, approved, rejected, disbursed, repaid, withdrawn
    },
    purpose: {
      type: String,
      required: true,
    },
    information: {
        type: String,
        required: true,
    },
    principleAmount: {
        type: Number,
        required: true
    },
    interestAmount: {
        type: Number,
        required: true,
    },
    interestRate: {
        type: Number,
        required: true
    },
    fees: {
        type: Number,
        default: 0,
    },
    installments: {
      type: Number,
      required: true,
    },
    repaymentFrequency: {
      type: String,
      required: true,
    },
    repayableAmount: { // principle + interest + fees
        type: Number,
        required: true
    },
    installmentAmount: {
      type: Number,
      required: true,
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    approvedAt: {
      type: Date,
    },
    rejectedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    rejectedAt: {
      type: Date,
    },
    disbursedAt: {
      type: Date,
    },
    disbursedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    submittedAt:{
        type: Date,
    },
    withdrawnAt: {
      // if status === withdrawn && user withdraws/deletes application
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("LoanApplication", schema);