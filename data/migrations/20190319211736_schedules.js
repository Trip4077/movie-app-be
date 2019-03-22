
exports.up = function(knex, Promise) {
  return knex.schema.createTable('schedules', tbl => {
      tbl.increments();
      tbl.string('date', 255)
         .notNullable()
      tbl.string('time', 255)
         .notNullable()
      tbl.string('info', 255)
         .notNullable()
      tbl.integer('user_id')
         .references('id')
         .inTable('users')
         .onDelete('CASCADE')
         .onUpdate('CASCADE')
         .notNullable()
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('schedules');
};
