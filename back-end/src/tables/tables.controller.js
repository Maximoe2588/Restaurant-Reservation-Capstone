const service = require("./tables.service");
const reservationsService = require("../reservations/reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const { hasRequiredProperties, hasValidValues } = require("./validation");

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

function tableIsBigEnough(req, res, next) {
    const { table, reservation } = res.locals;
    if (table.capacity >= reservation.people) {
        return next();
    }
    next({
        status: 400,
        message: `Table with id: ${table.table_id} does not have the capacity to seat this reservation: capacity must be at least ${reservation.people}`,
    });
}

function tableIsOccupied(req, res, next, shouldBeOccupied) {
    const { table } = res.locals;
    if ((table.reservation_id && shouldBeOccupied) || (!table.reservation_id && !shouldBeOccupied)) {
        return next();
    }
    next({
        status: 400,
        message: `Table with id: ${table.table_id} is ${shouldBeOccupied ? "not" : ""} occupied`,
    });
}

function tableIsFree(req, res, next) {
    return tableIsOccupied(req, res, next, false);
}

function tableIsOccupiedMiddleware(req, res, next) {
    return tableIsOccupied(req, res, next, true);
}

function assignReservationToTable(req, res, next) {
    const { table } = res.locals;
    const { reservation_id } = req.body.data;
    table.reservation_id = reservation_id;
    res.locals.resId = reservation_id;
    res.locals.resStatus = "seated";
    if (table.reservation_id) {
        return next();
    }
    next({
        status: 400,
        message: `Table with id: ${table.table_id} could not be assigned reservation id ${table.reservation_id}  for some reason. Please contact backend engineer for assistance`,
    });
}

function removeReservationFromTable(req, res, next) {
    const { table } = res.locals;
    res.locals.resId = table.reservation_id;
    table.reservation_id = null;
    res.locals.resStatus = "finished";
    if (!table.reservation_id) {
        return next();
    }
    next({
        status: 400,
        message: `Table with id: ${table.table_id} could not remove reservation id ${table.reservation_id}  for some reason. Please contact backend engineer for assistance`,
    });
}


async function list(req, res) {
    const tables = await service.list();
    res.locals.data = tables;
    const { data } = res.locals;
    res.json({ data: data });
}


    async function create(req, res) {
    const data = await service.create(req.body.data);
    res.status(201).json({ data });
}


    async function read(req, res) {
    const { table } = res.locals;
    res.json({ data: table });
}