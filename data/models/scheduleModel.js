const knex = require('knex');
const knexConfig = require('../../knexfile');

const db = knex(knexConfig.development);

module.exports = {
    scheduleMovie: (movie, res) => {
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
    },

    deleteScheduled: (id, res) => {
        return db('schedules')
                 .where({ id })
                 .del()
                 .then(success => {
                     if(success) {
                         res.status(201).json(success);
                     }
                     else {
                         res.status(404).json({ error: err, message: `Schedule with id:${id} not found` })
                     }
                 })
                 .catch(err => {
                    res.status(500).json({ error: err, message: "The scheduled movie could not be deleted.", id: id });
                 })
    }
}
