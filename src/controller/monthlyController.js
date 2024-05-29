import {
  getReport,
  getReportForUser,
  updateExpenses,
} from "../service/monthyReportService.js";

export const getMonthlyReport = async (req, res) => {
  const year = req.query.year;
  const monthNumber = req.query.monthNumber;
  try {
    const result = await getReport(year, monthNumber);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMonthlyReportUser = async (req, res) => {
  const year = req.query.year;
  const monthNumber = req.query.monthNumber;
  try {
    const result = await getReportForUser(year, monthNumber);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateMonthlyExpenses = async (req, res) => {
  const year = req.body.params.year;
  const monthNumber = req.body.params.monthNumber;
  const { personal, energy, water, site, other } = req.body.params.expenses;
  try {
    const result = await updateExpenses(
      year,
      monthNumber,
      personal,
      energy,
      water,
      site,
      other
    );
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
