import Transaction from "#models/Transaction.js";
import generate from "#utils/generate-string.js";

const createTransaction = async ({
  user,
  transactionType,
  accountType,
  accountId,
}) => {
  return await Transaction.create({
    user,
    code: generate(6),
    status: "pending",
    transactionType,
    accountType,
    accountId,
    dateInitiated: new Date(),
  });
};

const getTransactions = async (params) => {
  return await Transaction.find(params);
};

const getTransaction = async (id) => {
  return await Transaction.findById(id);
};

//params: status only
const updateTransaction = async (id, { status, providerCode, error }) => {
  let params = { status: "pending" };
  switch (status) {
    case "completed":
      params.status = "completed";
      params.dateCompleted = new Date();
      if(!providerCode){
        throw new Error('Provider code not provided');
      }
      params.providerCode = providerCode;
      break;

    case "failed":
      params.status = "failed";
      break;

    case "cancelled":
      params.status = "cancelled";
      params.dateCancelled = new Date()
      break;
  }

  await Transaction.findByIdAndUpdate(id, params);
};

export default {
  createTransaction,
  getTransaction,
  getTransactions,
  updateTransaction,
};
