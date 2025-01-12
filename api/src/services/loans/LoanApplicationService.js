import LoanApplication from "#models/LoanApplication.js";
import LoanService from "#services/loans/LoanService.js";
import Notify from "#services/NotificationService.js";

const getUserLoanApplications = async (user) => {
  return await LoanApplication.find({ user });
};

const getPendingLoanApplications = async () => {
  // status is either rejected, approved or pending
  const data = await LoanApplication.find({
    status: {
      $in: ["pending", "approved", "rejected"],
    },
  }).populate("user");

  return data;
};

const create = async (params) => {
  const {
    user,
    status,
    purpose,
    information,
    principleAmount,
    interestRate,
    interestAmount,
    installments,
    installmentAmount,
    fees,
    repaymentFrequency,
    repayableAmount,
  } = params;

  console.log(params);

  const _status = ["pending", "draft"].includes(status) ? status : "draft";
  const data = {
    user,
    status: _status,
    purpose,
    information,
    principleAmount,
    interestRate,
    interestAmount,
    installments,
    fees,
    repaymentFrequency,
    repayableAmount,
    installmentAmount,
    submittedAt: new Date(),
  };
  const _application = await LoanApplication.create(data);
  return _application;
};

const update = async (id, params) => {
  const action = {};
  const currentUser = params.currentUser;
  const notifyParams = {};
  const loan = await LoanApplication.findById(id);

  switch (params.status) {
    case "pending":
      action.submittedAt = new Date();
      break;

    case "approved":
      action.approvedAt = new Date();
      action.approvedBy = currentUser;
      notifyParams.subject = "🎉 Your Loan Application Has Been Approved!";
      notifyParams.template = "loans/loan-approved";
      notifyParams.context = {
        amount: loan.principleAmount.toLocaleString(),
      };
      break;

    case "rejected":
      action.rejectedAt = new Date();
      notifyParams.subject = "🙁 Update on Your Loan Application";
      notifyParams.template = 'loans/loan-rejected'
      notifyParams.context = {
        amount: loan.principleAmount.toLocaleString()
      }
      action.rejectedBy = currentUser;
      break;

    case "disbursed":
      action.disbursedAt = new Date();
      action.disbursedBy = currentUser;
      notifyParams.subject = "💰 Your Loan Has Been Disbursed!";
      notifyParams.template = "loans/loan-disbursed";
      notifyParams.context = {
        amount: loan.principleAmount.toLocaleString(),
      };
      await LoanService.createAccount(id);
      break;

    case "repaid":
      action.repaidAt = new Date();
      break;

    case "withdrawn":
      action.withdrawnAt = new Date();
      break;

    default: // pending
      throw "Unknown status";
  }

  const payload = {
    status: params.status,
    ...action,
  };

  await LoanApplication.findByIdAndUpdate(id, payload);
  if (Object.keys(notifyParams).length) {
    await Notify(loan.user, notifyParams);
  }
};

const destroy = async (id) => {
  await LoanApplication.findByIdAndDelete(id);
};

export default {
  getUserLoanApplications,
  getPendingLoanApplications,
  create,
  update,
  destroy,
};
