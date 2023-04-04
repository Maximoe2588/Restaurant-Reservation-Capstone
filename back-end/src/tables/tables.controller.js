const service = require("./tables.service");
const reservationsService = require("../reservations/reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const ensurePropertiesExist = require("../errors/ensurePropertiesExist");


async function hasReservationId(req, res, next) {
    if (req.body?.data?.reservation_id) {
        return next();
    }
    next({
        status: 400,
        message: `reservation_id is missing from request`,
    });
}

async function reservationExists(req, res, next) {
    const { reservation_id } = req.body.data;
    const reservation = await reservationsService.read(reservation_id);
    if (reservation) {
        res.locals.reservation = reservation;
        return next();
    }
    next({
        status: 404,
        message: `Reservation with id: ${reservation_id} was not found`,
    });
}

async function reservationIsBooked(req, res, next) {
    const { reservation } = res.locals;
    if (reservation.status !== "seated") {
        return next();
    }
    next({
        status: 400,
        message: `Reservation is already 'seated'`,
    });
}

async function tableExists(req, res, next) {
    const { table_id } = req.params;
    const table = await service.read(table_id);
    if (table) {
        res.locals.table = table;
        return next();
    }
    next({
        status: 404,
        message: `Table with id: ${table_id} was not found`,
    });
}

const VALID_PROPERTIES = ["table_name", "capacity", "reservation_id"];

function hasOnlyValidProperties(req, res, next) {
    const { data = {} } = req.body;
    const invalidFields = Object.keys(data).filter(
        (field) => !VALID_PROPERTIES.includes(field)
    );

    if (invalidFields.length) {
        return next({
        status: 400,
        message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
    }
    next();
}

const hasRequiredProperties = ensurePropertiesExist(...["table_name", "capacity"]);

function tableNameIsValid(tableName) {
    return tableName.length > 1;
    }

function capacityIsValid(capacity) {
    return Number.isInteger(capacity) && capacity >= 1;
}

function hasValidValues(req, res, next) {
    const { table_name, capacity } = req.body.data;

    if (!capacityIsValid(capacity)) {
        return next({
            status: 400,
            message: "capacity must be a whole number greater than or equal to 1",
        });
    }
    if (!tableNameIsValid(table_name)) {
        return next({
            status: 400,
            message: "table_name must be more than one character",
        });
    }
    next();
}

async function list(req, res) {
    const tables = await service.list();
    res.locals.data = tables;
    const { data } = res.locals;
    res.json({ data: data });
}

  // Create handler for a new table
async function create(req, res) {
    const data = await service.create(req.body.data);
    res.status(201).json({ data });
}

  // Read a table
async function read(req, res) {
    //* res.locals.table is being set from tableExists()
    const { table } = res.locals;
    res.json({ data: table });
}