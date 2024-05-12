import MonthlyReport from "../model/monthlyReport.js";

export const getMonthlyReport = async (req, res) => {
  const year = req.query.year;
  const monthNumber = req.query.monthNumber;
  try {
    const result = await MonthlyReport.findOne({
      where: {
        monthNumber: `${monthNumber}`,
        year: `${year}`,
      },
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
