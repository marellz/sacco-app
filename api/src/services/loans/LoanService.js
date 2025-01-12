import TransactionService from "#services/TransactionService.js";
import LoanApplication from "#models/LoanApplication.js";
import Loan from "#models/Loan.js";

const createAccount = async (applicationId) => {
  const application = await LoanApplication.findById(applicationId);

  await Loan.create({
    user: application.user,
    application: applicationId,
    currentBalance: application.principleAmount,
    disbursedBalance: application.principleAmount, // todo: minus fees?
    installmentsRemaining: application.installments,
    installmentAmount: application.installmentAmount,
    repaymentBalance: application.repayableAmount,
  });
};

const updateAccount = async (id, params) => {
  await LoanApplication.findByIdAndUpdate(id, params);
};

const initiateRepayment = async ({ loanId, user, amount }) => {
  const data = {
    user,
    code,
    transactionType: "repayment",
    accountType: "loan",
    accountId: loanId,
    amount,
  };

  return await TransactionService.create(data);

};

// todo: move to transactionService?
const processRepayment = async (transactionId, providerCode, status) => {
  // mark transaction as failed or completed
  let params = {};
  switch (status) {
    case "succcess":
      params.status = "completed";
      params.providerCode = providerCode;
      break;

    case "failed":
      params.status = "failed";
      break;

    default: // error or something else, def not success
      params.status = "failed";
  }

  await TransactionService.updateTransaction(transactionId, params);

  if (status === "completed") {
    const transaction = await TransactionService.getTransaction(transactionId);
    const id =
      transaction.accountType === "loan" ? transaction.accountId : null;
    if (!id) {
      throw new Error("Could not locate Loan account");
    }
    const loan = Loan.findById(id);
    let loanParams = {};

    // recalculate installments
    let remainingBalance = loan.repayableAmount - transaction.amount;
    let repaidAmount = loan.repaidAmount + transaction.amount;
    let installmentsRemaining = loan.repaidAmount / loan.installmentAmount;
    // note: if installmentsRemaining < 1, update installmentAmount,
    // and remaining installments is 1
    loanParams.repaymentBalance = remainingBalance;
    loanParams.repaidAmount = repaidAmount;
    loanParams.installmentsRemaining = Math.ceil(installmentsRemaining);

    if (installmentsRemaining < 1) {
      loanParams.installmentsRemaining = 1;
      loanParams.installmentAmount = remainingBalance;
    }

    await Loan.findByIdAndUpdate(id, loanParams);
  }
};

const withdraw = async (loanId, amount, { target, targetNumber }) => {
  /**
   * todo: rethink this
   * { target: MPESA, targetId: phoneNumber },
   * { target: Savings, targetId: savingsId },
   */
  const loan = await Loan.findById(loanId);

  if (loan.currentBalance < amount) {
    throw new Error("Insufficient balance in your loan account");
  }

  const newBalance = loan.currentBalance - amount;

  // todo: move to MPESA? Savings account - target

  await Loan.findOneAndUpdate(
    {
      application: id,
    },
    {
      currentBalance: newBalance,
    }
  );

  await LoanApplication.findByIdAndUpdate(id, {
    withdrawnAt: new Date(),
  });
};


export default {
  createAccount,
  updateAccount,
  initiateRepayment,
  processRepayment,
  withdraw
};
