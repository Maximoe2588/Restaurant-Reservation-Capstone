const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const ensurePropertiesExist = require("../errors/ensurePropertiesExist");


//check if a reservation with the given ID exists in the database.

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

//valid properties that can be included in a request body

const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
  "status",
  "reservation_id",
  "created_at",
  "updated_at",
];



function ensureOnlyValidProperties(req, res, next) {
  // extracts the "data" object from the request body, or sets it to an empty object if it doesn't exist
  const { data = {} } = req.body;
  // filters out any keys in the "data" object that are not included in the VALID_PROPERTIES array
  const invalidStatuses = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );
  if (invalidStatuses.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidStatuses.join(", ")}`,
    });
  }
  next();
}

//contains all the properties that are required to create a new reservation.

const REQUIRED_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
];

// uses error function that checks for required properties

const hasRequiredProperties = ensurePropertiesExist(...REQUIRED_PROPERTIES);


// regex patterns to validate date and time formats

const dateFormat = /^\d\d\d\d-\d\d-\d\d$/;
const timeFormat = /^\d\d:\d\d$/;

// checks whether a given time string matches the expected format
function timeIsValid(timeString) {
  return timeString.match(timeFormat)?.[0];
}
// checks whether a given date string matches the expected format
function dateFormatIsValid(dateString) {
  return dateString.match(dateFormat)?.[0];
}
// checks whether a given date and time are in the future
function dateNotInPast(dateString, timeString) {
  const now = new Date();
  
  const reservationDate = new Date(dateString + "T" + timeString);
  return reservationDate >= now;
}

// checks whether a given time is during business hours (10:30 AM to 9:30 PM)

function timeDuringBizHours(timeString) {
  const open = "10:30";
  const close = "21:30";
  return timeString <= close && timeString >= open;
}

// checks whether a given date is not a Tuesday

function dateNotTuesday(dateString) {
  const date = new Date(dateString);
  return date.getUTCDay() !== 2;
}
// checks whether a given status is either null or "booked"

function statusIsBookedOrNull(status) {
  if (!status || status === "booked") {
    return true;
  } else {
    return false;
  }
}

// validate reservation data before it's saved to the database

function hasValidValues(req, res, next) {
  const { reservation_date, reservation_time, people } = req.body.data;

  // check if the number of people is a positive integer
  if (!Number.isInteger(people) || people < 1) {
    return next({
      status: 400,
      message: "# of people must be a whole number and >= 1",
    });
  }

    // check if the reservation time is in the correct format
  if (!timeIsValid(reservation_time)) {
    return next({
      status: 400,
      message: "reservation_time must be in HH:MM:SS (or HH:MM) format",
    });
  }
   // check if the reservation date is in the correct format
  if (!dateFormatIsValid(reservation_date)) {
    return next({
      status: 400,
      message: "reservation_date must be in YYYY-MM-DD (ISO-8601) format",
    });
  }

  // check if the reservation date and time are in the future
  if (!dateNotInPast(reservation_date, reservation_time)) {
    return next({
      status: 400,
      message: `You are attempting to submit a reservation in the past. Only future reservations are allowed`,
    });
  }
  // check if the reservation time is within business hours
  if (!timeDuringBizHours(reservation_time)) {
    return next({
      status: 400,
      message: "The reservation time must be between 10:30 AM and 9:30 PM",
    });
  }
  // check if the reservation date is not a Tuesday (when the restaurant is closed)
  if (!dateNotTuesday(reservation_date)) {
    return next({
      status: 400,
      message:
        "The reservation date is a Tuesday- but the restaurant is closed on Tuesdays",
    });
  }
  // check if the status is either null or "booked"
  if (!statusIsBookedOrNull(req.body.data?.status)) {
    return next({
      status: 400,
      message: '"seated" and "finished" are not valid statuses upon creation',
    });
  }
  next();
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

module.exports = {
  create: [
    ensureOnlyValidProperties,
    hasRequiredProperties,
    hasValidValues,
    asyncErrorBoundary(create),
  ], 
  list: [ 
    asyncErrorBoundary(list)
  ],
  read: [
    reservationExists, 
    asyncErrorBoundary(read)
  ],
};
