const Visitor = require("../models/visitor");
const Badge = require("../models/badge");
const Logs = require("../models/visitorLogs");

const { getVisitors, getVisitorList } = require("../utils/statUtils");

exports.totalVisitors = async (req, res) => {
  const { startDate, endDate } = req.body;

  try {
    const { visitors, errors } = await getVisitors(startDate, endDate);

    if (!(errors.length === 0)) {
      return res.status(400).json({ error: errors[0] });
    }

    const total = visitors.reduce(
      (total, visitor) => (total += visitor.count),
      0
    );
    const percent = Math.ceil((visitors[0].count / total) * 100);
    const walk_in = visitors.find((v) => v._id === "Walk-In");
    const pre_reg = visitors.find((v) => v._id === "Pre-Registered");
    const type = visitors[0]._id;

    return res
      .status(200)
      .json({
        walk_in: walk_in ? walk_in.count : 0,
        pre_reg: pre_reg ? pre_reg.count : 0,
        total: total,
        percent: `${percent}%`,
        type: type,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to retrieve visitors from the database." });
  }
};

exports.mostVisited = async (req, res) => {
  const { startDate, endDate } = req.body;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const date_01 = startDate ? new Date(startDate) : today;
  const date_02 = endDate ? new Date(endDate) : endOfDay;

  try {
    const visitors = await getVisitorList(date_01, date_02);
    const where = await Visitor.aggregate([
      {
        $match: {
          _id: { $in: visitors },
        },
      },
      {
        $unwind: "$purpose.where",
      },
      {
        $group: {
          _id: "$purpose.where",
          count: { $count: {} },
        },
      },
      {
        $sort: {
          count: -1,
          _id: 1,
        },
      },
    ]);

    const who = await Visitor.aggregate([
      {
        $match: {
          _id: { $in: visitors },
        },
      },
      {
        $unwind: "$purpose.who",
      },
      {
        $group: {
          _id: "$purpose.who",
          count: { $count: {} },
        },
      },
      {
        $sort: {
          count: -1,
          _id: 1,
        },
      },
    ]);

    const what = await Visitor.aggregate([
      {
        $match: {
          _id: { $in: visitors },
        },
      },
      {
        $unwind: "$purpose.what",
      },
      {
        $group: {
          _id: "$purpose.what",
          count: { $count: {} },
        },
      },
      {
        $sort: {
          count: -1,
          _id: 1,
        },
      },
    ]);

    const when = await Visitor.aggregate([
      {
        $match: {
          _id: { $in: visitors },
        },
      },
      {
        $group: {
          _id: "$purpose.when",
          count: { $count: {} },
        },
      },
      {
        $sort: {
          count: -1,
          _id: -1,
        },
      },
    ]);

    return res
      .status(200)
      .json({ what: what[0], where: where[0], when: when[0], who: who[0] });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to retrieve visitors from the database." });
  }
};

// exports.graph = async (req, res) => {
//   const { month, year } = req.body;

//   try {

//   } catch (error) {
//     return res.status(500).json({ error: 'Failed to retrieve visitors from the database.' });
//   }
// }

exports.getYears = async (req, res) => {
  try {
    const yearsAndMonths = await Logs.aggregate([
      {
        $project: {
          year: { $substr: ["$created_at", 0, 4] },
          month: { $substr: ["$created_at", 5, 2] },
        },
      },
      {
        $group: {
          _id: null,
          years: { $addToSet: "$year" }, // Collect unique years
          months: { $addToSet: "$month" }, // Collect unique months
        },
      },
    ]);

    const years = yearsAndMonths[0].years.map((year) => ({ _id: year }));
    const months = yearsAndMonths[0].months.map((month) => ({ _id: month }));

    const _years = years.map((year) => year._id);
    const _months = months.map((month) => month._id);

    return res.json({ _years, _months });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to retrieve years from the database." });
  }
};

exports.getWeeks = async (req, res) => {
  try {
    const weeks = await Logs.aggregate([
      {
        $project: {
          month: { $substr: ["$created_at", 5, 2] },
          day: { $substr: ["$created_at", 8, 2] },
        },
      },
      {
        $group: {
          _id: "$month",
          weekSet: {
            $addToSet: {
              _id: "$day",
              week1: {
                $cond: [
                  {
                    $and: [{ $gte: ["$day", "01"] }, { $lte: ["$day", "07"] }],
                  },
                  true,
                  false,
                ],
              },
              week2: {
                $cond: [
                  {
                    $and: [{ $gte: ["$day", "08"] }, { $lte: ["$day", "14"] }],
                  },
                  true,
                  false,
                ],
              },
              week3: {
                $cond: [
                  {
                    $and: [{ $gte: ["$day", "15"] }, { $lte: ["$day", "21"] }],
                  },
                  true,
                  false,
                ],
              },
              week4: {
                $cond: [
                  {
                    $and: [{ $gte: ["$day", "22"] }, { $lte: ["$day", "31"] }],
                  },
                  true,
                  false,
                ],
              },
            },
          },
        },
      },
    ]);

    return res.json({ weeks });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to retrieve years from the database." });
  }
};
