function filterData(visitor) {
    return {
        name: visitor.name,
        email: visitor.email,
        phone: visitor.phone,
        plate_num: visitor.plate_num,
        visitor_type: visitor.visitor_type,
        status: visitor.status,
        address: visitor.address,
        createdAt: visitor.createdAt,
        updatedAt: visitor.updatedAt
    };
}

module.exports = { filterData };