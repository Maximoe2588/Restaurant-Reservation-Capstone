const knex = require("../db/connection");

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


module.exports = {
    create,
    read,
    update,
    
};