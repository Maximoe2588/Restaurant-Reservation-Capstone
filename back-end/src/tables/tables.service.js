const knex = require("../db/connection");

//returns tables in alphabetical order by name

function list() {
    return knex("tables")
        .select("*")
        .orderBy("table_name");
}

//inserts a new table and returns the new table

function create(table) {
    return knex("tables")
        .insert(table)
        .returning("*")
        .then((newTables) => newTables[0]);
}

//returns the table with the specified id

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