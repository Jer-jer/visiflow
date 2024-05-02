const Visitor = require("../models/visitor");
const Logs = require("../models/visitorLogs");

const { getVisitors, getVisitorList } = require("../utils/statUtils");

exports.totalVisitors = async (req, res) => {
  const { startDate, endDate } = req.body;

  try {
    const { visitorDB, errors } = await getVisitors(startDate, endDate);

    if (!(errors.length === 0)) {
      return res.status(400).json({ error: errors[0] });
    }

    const total = visitorDB.reduce(
      (total, visitor) => (total += visitor.count),
      0
    );
    const percent = Math.ceil((visitorDB[0].count / total) * 100);
    const walk_in = visitorDB.find((v) => v._id === "Walk-In");
    const pre_reg = visitorDB.find((v) => v._id === "Pre-Registered");
    const type = visitorDB[0]._id;

    return res.status(200).json({
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
  today.setHours(today.getHours() - 8);
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);
  endOfDay.setHours(endOfDay.getHours() - 8);

  const date_01 =
    startDate != undefined && startDate ? new Date(startDate) : today;
  const date_02 =
    endDate != undefined && endDate ? new Date(endDate) : endOfDay;

  try {
    const visitors = await getVisitorList(date_01, date_02);
    const where = await Visitor.aggregate([
      {
        $match: {
          $or: visitors.map((visitor) => {
            return {
              _id: visitor.visitor_id,
              expected_time_in: visitor.expected_time_in,
            };
          }),
        },
      },
      {
        $project: {
          "purpose.where": 1,
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
          $or: visitors.map((visitor) => {
            return {
              _id: visitor.visitor_id,
              expected_time_in: visitor.expected_time_in,
            };
          }),
        },
      },
      {
        $project: {
          "purpose.who": 1,
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
          $or: visitors.map(visitor => {
            return {
              _id: visitor.visitor_id,
              expected_time_in: visitor.expected_time_in
            }
          })
        }
      },
      {
        $project: {
          "purpose.what": 1,
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
          $or: visitors.map((visitor) => {
            return {
              _id: visitor.visitor_id,
              expected_time_in: visitor.expected_time_in,
            };
          }),
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

exports.graph = async (req, res) => {
  const { month, year } = req.body;

  const _start_date = new Date(
    year ? year : new Date().getFullYear(),
    month ? month - 1 : 0
  );
  const _end_date = new Date(
    month ? _start_date.getFullYear() : _start_date.getFullYear() + 1,
    month ? month : 0
  );
  _end_date.setDate(_end_date.getDate() - 1);

  try {
    const visitors = await getVisitorList(_start_date, _end_date);

    if (visitors === null) {
      return res
        .status(400)
        .json({ error: "No visitors available in the specified date range" });
    }

    const data = await Visitor.aggregate([
      {
        $match: {
          $or: visitors.map((visitor) => {
            return {
              _id: visitor.visitor_id,
              expected_time_in: visitor.expected_time_in,
            };
          }),
        },
      },
      {
        $project: {
          month: { $substr: ["$expected_time_in", 5, 2] },
          visitor_type: 1,
        },
      },
      {
        $group: {
          _id: { month: "$month", visitor_type: "$visitor_type" },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: "$_id.month",
          visitor_types: {
            $addToSet: {
              visitor_type: "$_id.visitor_type",
              count: "$count",
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          visitor_types: 1,
          total_count: { $sum: "$visitor_types.count" },
        },
      },
    ]);

    if (data.length > 0) {
      return res.json({ data });
    } else {
      return res
        .status(400)
        .json({ error: "Visitor does not exists in database" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to retrieve visitors from the database." });
  }
};

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
          badge_id: 1,
        },
      },
      {
        $lookup: {
          from: "badges",
          localField: "badge_id",
          foreignField: "_id",
          as: "badge",
        },
      },
      {
        $group: {
          _id: "$month",
          weeks: {
            $addToSet: {
              _id: "$day",
              1: {
                $cond: [
                  {
                    $and: [{ $gte: ["$day", "01"] }, { $lte: ["$day", "07"] }],
                  },
                  true,
                  false,
                ],
              },
              2: {
                $cond: [
                  {
                    $and: [{ $gte: ["$day", "08"] }, { $lte: ["$day", "14"] }],
                  },
                  true,
                  false,
                ],
              },
              3: {
                $cond: [
                  {
                    $and: [{ $gte: ["$day", "15"] }, { $lte: ["$day", "21"] }],
                  },
                  true,
                  false,
                ],
              },
              4: {
                $cond: [
                  {
                    $and: [{ $gte: ["$day", "22"] }, { $lte: ["$day", "31"] }],
                  },
                  true,
                  false,
                ],
              },
              badges: "$badge_id",
            },
          },
        },
      },
      {
        $unwind: "$weeks",
      },
      {
        $project: {
          _id: 1,
          "weeks._id": 1,
          "weeks.activeWeek": {
            $cond: [
              "$weeks.1",
              "1",
              {
                $cond: [
                  "$weeks.2",
                  "2",
                  {
                    $cond: [
                      "$weeks.3",
                      "3",
                      {
                        $cond: ["$weeks.4", "4", null],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          "weeks.badges": 1,
        },
      },
      {
        $sort: {
          _id: 1,
          "weeks._id": 1,
        },
      },
      {
        $match: {
          "weeks.activeWeek": { $ne: null },
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

exports.getDays = async (req, res) => {
  try {
    const date = new Date();

    const total = await Logs.aggregate([
      {
        $project: {
          _id: 0,
          month: { $substr: ["$created_at", 5, 2] },  
          days: { $substr: ["$created_at", 8, 2] }  
        }
      },
      {
        $group: {
          _id: {
            month: "$month",
            day: "$days"
          },
          total: { $sum: 1}
        }
      }
      
    ]);

    return res.json({ total });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to retrieve years from the database." });
  }
};
