const Visitor = require('../models/visitor');
const Badge = require('../models/badge');
const Logs = require('../models/visitorLogs');

async function getVisitorList(date_01, date_02) {
  try {
    const logs = await Logs.aggregate([
      {
        $match: {
          check_in_time: {
            $gte: date_01,
            $lte: date_02
          }
        }
      },
      {
        $lookup: {
          from: "badges",
          localField: "badge_id",
          foreignField: "_id",
          as: "badge"
        }
      },
      {
        $unwind: "$badge"
      },
      {
        $group: {
          _id: null,
          visitor_id: { $push: "$badge.visitor_id" }
        }
      },
      {
        $project: {
          _id: 0,
          visitor_id: 1
        }
      }
    ]);

    if (logs.length === 0) {
      return null;
    } 

    const idArray = logs.length > 0 ? logs[0].visitor_id : [];
    console.log(idArray);
    return idArray;
  } catch (error) {
    return error;
  }
}

async function getVisitors(startDate, endDate) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const date_01 = startDate ? new Date(startDate) : today;
  const date_02 = endDate ? new Date(endDate) : endOfDay;

  const errors = [];


  if (date_01 > date_02) {
    const errMsg = "Invalid date range";
    errors.push(errMsg);
    return { errors };
  }

  try { 
    const idArray = await getVisitorList(date_01, date_02);

    if (idArray === null) {
      const errMsg = "No visitor in that date range.";
      errors.push(errMsg);
      return { errors };
    }

    const visitors = await Visitor.aggregate([
      {
        $match: {
          _id: { $in: idArray }
        }
      },
      {
        $group: {
          _id: "$visitor_type",
          count: { $count: {} }
        }
      },
      {
        $sort: {
          count: -1
        }
      }
    ]);

    return {visitors, errors};
  } catch (error) {
    return error;
  }
}

module.exports = {
  getVisitors,
  getVisitorList
}