import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    // parent application id
    application: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LoanApplications",
    },

    // applicant user id
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // status of the loan: active, repaid, defaulted
    status: {
      type: String,
      default: "active",
    },
    
    // amount repaid so far, changes per transaction
    repaidAmount: {
      type: Number,
      default: 0,
    },
    // amount remaining in the loan account. initially disbursed amount, minus withdrawals
    currentBalance: {
      type: String,
      default: 0,
    },

    // amount disbursed at the beginning, does not change
    disbursedBalance: {
      type: Number,
      required: true,
    },

    // remaining amount to be repaid, changes per transaction
    repaymentBalance: {
      // remaining amount
      type: Number,
      required: true,
    },

    // number of installments remaining, changes per transaction
    installmentsRemaining: {
      type: Number,
      required: true,
    },

    // amount to be repaid per installment, changes on last transaction?
    installmentAmount: {
      type: Number,
      required: true,
    },

    // last day this loan was repaid, changes per transaction
    lastPaymentDate: {
      type: Date,
    },

    // day when the loan was fully repaid, changes on the last transaction 
    // (repaidAmount >= repaymentBalance)
    repaidAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Loans", schema);
