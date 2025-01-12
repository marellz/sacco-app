import mongoose from "mongoose";

const schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    code:{
        type: String,
        required: true
    },
    providerCode: {
        type: String,
    },
    transactionType: {
        type: String, // deposit, withdrawal, repayment, contribution, adjustment?
        required: true,
    },
    accountType: {
        type: String, // loan, savings, contribution
        required: true,
    },
    accountId: {
        type: String, // loanId, savingsId, contributionId, phoneNumber?
        required: true,
    },
    dateInitiated:{
        type: Date,
        required: true,
    },
    dateCompleted:{
        type: Date,
    },
    dateCancelled:{
        type: Date,
    },
    amount: {
        type: Number,
        required: true,
    },
    description:{
        type: String,
    },
    status: {
        type: String,
        required: true,
        default: "pending", // pending, completed, failed, cancelled
    },
}, { timestamps: true });

export default mongoose.model("Transactions", schema);