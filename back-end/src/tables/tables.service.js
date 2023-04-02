const knex = require("../db/connection");

function list() {
    return knex("tables").select("*").orderBy("table_name");
}

function create(table) {
    return knex("tables")
        .insert(table)
        .returning("*")
        .then((newTables) => newTables[0]);
}

function read(id) {
    return knex("tables")
        .select("*")
        .where({ table_id: id })
        .then((result) => result[0]);
}

module.exports = {
    create,
    read,
    list,
    
};