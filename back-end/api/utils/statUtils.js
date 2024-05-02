const Visitor = require("../models/visitor");
const Badge = require("../models/badge");
const Logs = require("../models/visitorLogs");

async function getVisitorList(date_01, date_02) {
  try {
    const logs = await Logs.aggregate([
      {
        $match: {
          check_in_time: {
            $gte: date_01,
            $lte: date_02,
          },
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
        $unwind: "$badge",
      },
      {
        $project: {
          _id: 0,
          visitor_id: "$badge.visitor_id",
          expected_time_in: "$badge.expected_time_in",
        },
      },
    ]);

    if (logs.length === 0) {
      return null;
    }
    
    return logs;
  } catch (error) {
    return error;
  }
}

async function getVisitors(startDate, endDate) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  console.log('Processing Date');

  const date_01 =
    startDate != undefined && startDate ? new Date(startDate) : today;
  const date_02 =
    endDate != undefined && endDate ? new Date(endDate) : endOfDay;

  console.log(`Default date: ${date_01} + ${date_02}`);

  const errors = [];

  if (date_01 > date_02) {
    const errMsg = "Invalid date range";
    errors.push(errMsg);
    return { errors };
  }

  try {
    const visitors = await getVisitorList(date_01, date_02);

    if (visitors === null) {
      console.log("No visitors");
      const errMsg = "No logs in that date range.";
      errors.push(errMsg);
      return { errors };
    }
    
    const visitorDB = await Visitor.aggregate([
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
          _id: "$visitor_type",
          count: { $count: {} },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
    ]);

    return { visitorDB, errors };
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = {
  getVisitors,
  getVisitorList,
};
