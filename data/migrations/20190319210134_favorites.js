
exports.up = function(knex, Promise) {
    return knex.schema.createTable('favorites', tbl => {
        tbl.increments()
        tbl.string('Poster', 255)
        tbl.string('Type', 255)
        tbl.string('Year', 255)
        tbl.string('imdbID', 255)
        tbl.string('Title', 255)
            .notNullable()
            .unique()
        tbl.integer('user_id')
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
            .notNullable()
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('favorites');
};
