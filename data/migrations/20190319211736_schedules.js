
exports.up = function(knex, Promise) {
  return knex.schema.createTable('schedules', tbl => {
      tbl.increments();
      
      tbl.string('imdb', 128)
         .notNullable();
      tbl.string('date', 255)
         .notNullable()
      tbl.string('readTime', 255)
         .notNullable()
      tbl.string('compareTime', 255)
         .notNullable()
      tbl.string('title', 255)
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
