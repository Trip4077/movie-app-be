
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', tbl => {
        tbl.increments();
        tbl.string('fullname', 255)
            .notNullable();
        tbl.string('username', 255)
            .notNullable()
            .unique();
        tbl.string('password', 255)
            .notNullable();
        tbl.string('number', 128)
            .notNullable();
        tbl.integer('age')
            .notNullable();
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
};
