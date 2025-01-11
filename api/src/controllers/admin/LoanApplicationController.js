import LoanApplicationService from "#services/loans/LoanApplicationService.js";

export const get = async (req, res) => {
  try {
    const data = await LoanApplicationService.getPendingLoanApplications();
    return res.json({ data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const reject = async (req, res) => {
  try {
    await LoanApplicationService.update(req.params.id, { status: "rejected" });
    return res.json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const approve = async (req, res) => {
  try {
    await LoanApplicationService.update(req.params.id, { status: "approved" });
    return res.json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const disburse = async (req, res) => {
  try {
    await LoanApplicationService.update(req.params.id, { status: "disbursed" });
    return res.json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};
