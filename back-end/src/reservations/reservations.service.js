const knex = require("../db/connection");

// returns non-finished reservations for the specified date

const searchByDate = async (date) => {
    const reservations = await knex("reservations")
        .select("*")
        .where({ reservation_date: date })
        .whereNot("status", "finished")
        .orderBy("reservation_time");
    return reservations;
};

  // returns all reservations that partial match the specified phone number

const searchByPhone = async (mobile_number) => {
    const reservations = await knex("reservations")
        .whereRaw(
            "translate(mobile_number, '() -', '') like ?",
            `%${mobile_number.replace(/\D/g, "")}%`
        )
    .orderBy("reservation_date");
    return reservations;
};


//retrieves a single reservation from the "res" table using the provided ID

function read(id) {
        return knex("reservations")
            .select("*")
            .where({ reservation_id: Number(id) })
            .then((result) => result[0]);
    }

//inserts a new reservation into the "res" table and returns the inserted data

function create(reservation) {
        return knex("reservations")
            .insert(reservation)
            .returning("*")
            .then((result) => result[0]);
        }

//updates existing reservation in the "res" table and returns the updated data
    
function update(reservation_id, updatedReservation) {
        return knex("reservations")
            .where({ reservation_id })
            .update(updatedReservation, "*")
            .then((result) => result[0]);
        }

function updateReservationStatus(reservation_id, status) {
        return knex("reservations")
            .where({ reservation_id })
            .update({ status }, "*");
        }


module.exports = {
    searchByDate,
    searchByPhone,
    create,
    read,
    update,
    updateReservationStatus
};