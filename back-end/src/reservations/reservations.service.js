const knex = require("../db/connection");

function read(id) {
        return knex("reservations")
            .select("*")
            .where({ reservation_id: Number(id) })
            .then((result) => result[0]);
    }

function create(reservation) {
        return knex("reservations")
            .insert(reservation)
            .returning("*")
            .then((result) => result[0]);
        }


module.exports = {
    create,
    read,
    
}