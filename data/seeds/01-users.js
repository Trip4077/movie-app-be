exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1, 
          fullname: 'Bernard Johnson', 
          username: 'trip1701', 
          password: 'password', 
          age: 26,
        },
        {
          id: 2, 
          fullname: 'Dranreb Johnson', 
          username: 'trip1702', 
          password: 'password', 
          age: 30
        },
        {
          id: 3, 
          fullname: 'Bernard Sonjohn', 
          username: 'trip1703', 
          password: 'password', 
          age: 43
        },
      ]);
    });
};
