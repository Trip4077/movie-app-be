
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('favorites').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('favorites').insert([
        { 
          Poster: 'test',
          Type: 'test',
          Year: 'test',
          imdbID: 'test',
          Title: 'test',
          user_id: 1
        },
        { 
          Poster: 'test2',
          Type: 'test2',
          Year: 'test2',
          imdbID: 'test2',
          Title: 'test2',
          user_id: 1
        },
        { 
          Poster: 'test3',
          Type: 'test3',
          Year: 'test3',
          imdbID: 'test3',
          Title: 'test3',
          user_id: 1
        },
        { 
          Poster: 'test4',
          Type: 'test4',
          Year: 'test4',
          imdbID: 'test4',
          Title: 'test4',
          user_id: 2
        },
        { 
          Poster: 'test5',
          Type: 'test5',
          Year: 'test5',
          imdbID: 'test5',
          Title: 'test5',
          user_id: 3
        },
        { 
          Poster: 'test6',
          Type: 'test6',
          Year: 'test6',
          imdbID: 'test6',
          Title: 'test6',
          user_id: 2
        },
      ]);
    });
};