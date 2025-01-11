import LoanApplication from "#models/LoanApplication.js";

const create = async (params) => {
  const data = await LoanApplication.create(data);
};

const update = async (id, params) => {
  await LoanApplication.findByIdAndUpdate(id, params);
};

const withdraw = async (id) => {
  await LoanApplication.findByIdAndUpdate(id, {
    withdrawnAt: new Date(),
  })
};

const destroy = async () => {
  await LoanApplication.findByAndDelete(id);
};

export default {
  create,
  update,
  withdraw,
  destroy,
};
