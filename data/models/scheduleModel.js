const knex = require('knex');
const knexConfig = require('../../knexfile');

const db = knex(knexConfig.development);

module.exports = {
    /* 
        Expects: 
            { imdb-str, 
            date-str, 
            readTime-str, 
            compareTime-str, 
            title-str, 
            user_id-int }
        To Schedule A Reminder
    */
    scheduleMovie: (movie, res) => {
        if(movie.compareTime && movie.readTime) {
            db.insert(movie)
              .into('schedules')
              .then(id => {
                  res.status(201).json(id[0]);
              })
              .catch(err => {
                  console.log(err)
                  res.status(500).json({ err: err, message: 'There was a problem :/'});
              })
        } else {
            res.status(400).json({ message: 'Missing date or time' });
        }
    },

    //Query the full list of scheduled reminders
    getFullSchedule: res => {
        return db.select('*')
                .from('schedules')
                .then(schedules => {
                    res.status(200).json(schedules);
                })
                .catch(err => {
                    res.status(500).json(err);
                })
    },

    //Get all scheduled reminders based on user_id
    getUserSchedule: (id, res) => {
        return db.select('*')
                 .from('schedules')
                 .where('user_id', id)
                 .then(schedule => {
                     if(schedule.length) {
                         res.status(200).json(schedule);
                     } else {
                         res.status(200).json({ message: `Nothing Scheduled` })
                     }
                 })
                 .catch(err => {
                     res.status(500).json(err);
                 })
    },

    //Edit scheduled reminder based on schedule id and changes passed in
    editSchedule: (edit, id, res) => {
        db('schedules')
          .where({ id })
          .update(edit)
          .then(success => {
              res.status(200).json(success);
          })
          .catch(err => {
              res.status(500).json(err);
          })
    },

    //Delete scheduled reminder based on schedule id
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
    },

    
}
