
const hasProperties = require("../errors/hasProperties");

//define an array of valid properties for the request body

const VALID_PROPERTIES = ["table_name", "capacity", "reservation_id"];

const hasRequiredProperties = hasProperties(...["table_name", "capacity"]);

// validate the table_name value

function tableNameIsValid(tableName) {
    return tableName.length > 1;
}

// validate the capacity value

function capacityIsValid(capacity) {
    return Number.isInteger(capacity) && capacity >= 1;
}


// validate the request body values

function hasValidValues(req, res, next) {
    const { table_name, capacity } = req.body.data;

    // check if the capacity value is valid

    if (!capacityIsValid(capacity)) {
        return next({
            status: 400,
            message: "capacity must be a whole number greater than or equal to 1",
    });
}

    // check if the table_name value is valid

    if (!tableNameIsValid(table_name)) {
        return next({
            status: 400,
            message: "table_name must be more than one character",
    });
}
    next();
}

module.exports = {
    hasRequiredProperties,
    hasValidValues,
};
