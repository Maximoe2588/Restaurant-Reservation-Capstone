//reservation table created with a reservation id and timestamps for created/updated 

exports.up = function (knex) {
  return knex.schema.createTable("reservations", (table) => {
    table.increments("reservation_id").primary();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("reservations");
};
