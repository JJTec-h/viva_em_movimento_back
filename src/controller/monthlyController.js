import MonthlyReport from "../model/monthlyReport.js";

export const getMonthlyReport = async (req, res) => {
  const year = req.query.year;
  const monthName = req.query.monthName;
  console.log(req.query);
  try {
    const result = await MonthlyReport.findOne({
      where: {
        monthName: `${monthName}`,
        year: `${year}`,
      },
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
