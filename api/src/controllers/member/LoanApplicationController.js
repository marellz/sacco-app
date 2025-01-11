import LoanApplicationService from "#services/loans/LoanApplicationService.js";

export const get = async (req, res) => {
    try {
        const data = await LoanApplicationService.getUserLoanApplications(req.user.id)
        return res.json({data})
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: error.message})
    }
}

export const create = async (req, res) => {
  try {
    const user = req.user.id;
    const {
      purpose,
      information,
      principleAmount,
      interestAmount,
      interestRate,
      fees = 0,
      status,
      installments,
      repaymentFrequency,
      repayableAmount,
      installmentAmount,
    } = req.body;

    const data = await LoanApplicationService.create({
      user,
      status,
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
    });

    return res.json({ success: true, data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const submit = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await LoanApplicationService.update(id, {
      status: "pending",
      currentUser: req.user._id,
    });

    return res.json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: true, error: error.message });
  }
};

export const reject = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await LoanApplicationService.update(id, {
      status: "rejected",
      currentUser: req.user._id,
    });

    return res.json({ success: true, data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: true, error: error.message });
  }
};

export const approve = async (req, res) => {
  try {
    const data = await LoanApplicationService.update(id, {
      status: "rejected",
      currentUser: req.user._id,
    });

    return res.json({ success: true, data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const disburse = async (req, res) => {
  const id = req.params.id;
  try {
    const params = {
      status: "disbursed",
      currentUser: req.user._id,
    };
    const data = await LoanApplicationService.update(id, params);

    return res.json({ success: true, data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

// member
export const withdraw = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await LoanApplicationService.update(id, {
      status: "withdrawn",
    });

    return res.json({ success: true, data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const destroy = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await LoanApplicationService.destroy(id, {
      status: "withdrawn",
    });

    return res.json({ success: true, data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};
