const knex = require('knex');
const knexConfig = require('../../knexfile');

const db = knex(knexConfig.development);

module.exports = {
    scheduleMovie: (movie, res) => {
        console.log(movie)
        if(movie.compareTime && movie.readTime) {
            db.insert(movie)
              .into('schedules')
              .then(id => {
                  res.status(201).json(id[0]);
              })
              .catch(rr => {
                  res.status(500).json({ err: err, message: 'There was a problem :/'});
              })
        } else {
            res.status(400).json({ message: 'Missing date or time' });
        }
    }
}
