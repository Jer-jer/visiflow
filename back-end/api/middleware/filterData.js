function filterData(user) {
  return {
    _id: user._id,
    name: user.name,
    username: user.username,
    email: user.email,
    phone: user.phone,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}
function filterVisitorData(visitor) {
  return {
    name: visitor.visitor_details.name,
    email: visitor.visitor_details.email,
    phone: visitor.visitor_details.phone,
    plate_num: visitor.plate_num,
    visitor_type: visitor.visitor_type,
    purpose: visitor.purpose,
    status: visitor.status,
    address: visitor.visitor_details.address,
    createdAt: visitor.createdAt,
    updatedAt: visitor.updatedAt,
  };
}

module.exports = { filterData, filterVisitorData };
