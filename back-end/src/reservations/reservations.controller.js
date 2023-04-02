const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


async function reservationExists(req, res, next) {
  const { reservationId } = req.params;
  const reservation = await service.read(reservationId);

  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `Reservation with id: ${reservationId} was not found`,
  });
}

async function list(req, res) {
  try {
    const reservations = await knex('reservations');
    res.json({ data: reservations });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function read(req, res) {
  const { reservation } = res.locals;
  res.json({ data: reservation });
}

async function create(req, res) {
  const reservation = await service.create(req.body.data);
  res.status(201).json({ data: reservation });
}


function hasValidValues(req, res, next) {
  const { reservation_date, reservation_time, people } = req.body.data;

  if (!Number.isInteger(people) || people < 1) {
    return next({
      status: 400,
      message: "# of people must be a whole number and >= 1",
    });
  }
  if (!timeIsValid(reservation_time)) {
    return next({
      status: 400,
      message: "reservation_time must be in HH:MM:SS (or HH:MM) format",
    });
  }
  if (!dateFormatIsValid(reservation_date)) {
    return next({
      status: 400,
      message: "reservation_date must be in YYYY-MM-DD (ISO-8601) format",
    });
  }
  if (!dateNotInPast(reservation_date, reservation_time)) {
    return next({
      status: 400,
      message: `You are attempting to submit a reservation in the past. Only future reservations are allowed`,
    });
  }
  if (!timeDuringBizHours(reservation_time)) {
    return next({
      status: 400,
      message: "The reservation time must be between 10:30 AM and 9:30 PM",
    });
  }
  if (!dateNotTuesday(reservation_date)) {
    return next({
      status: 400,
      message:
        "The reservation date is a Tuesday- but the restaurant is closed on Tuesdays",
    });
  }
  if (!statusIsBookedOrNull(req.body.data?.status)) {
    return next({
      status: 400,
      message: '"seated" and "finished" are not valid statuses upon creation',
    });
  }
  next();
}

module.exports = {
  list,
};
