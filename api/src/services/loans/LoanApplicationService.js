import LoanApplication from "#models/LoanApplication.js";

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
  switch (params.status) {
    case "pending":
      action.submittedAt = new Date();
      break;

    case "approved":
      action.approvedAt = new Date();
      action.approvedBy = currentUser;
      break;

    case "rejected":
      action.rejectedAt = new Date();
      action.rejectedBy = currentUser;
      break;

    case "disbursed":
      action.disbursedAt = new Date();
      action.disbursedBy = currentUser;
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
    ...action
  };

  await LoanApplication.findByIdAndUpdate(id, payload);
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
