const knex = require('knex');
const knexConfig = require('../../knexfile'); 

const db = knex(knexConfig.development);

module.exports = {

    getFavorites: res => {
        return db.select('*')
                .from('favorites')
                .then(favorites => {
                    res.status(200).json(favorites);
                })
                .catch(err => {
                    console.log(err);
                    res.status(404).json({ error: err, message: "Could not get Users" })
                })
    },
    
    getFavoritesById: (id, res) => {
        db('favorites')
        .where({ id })
        .then(favorite => {
          if(favorite.length > 0) {
              res.status(200).json(favorite[0])
          } else {
              res.status(404).json({ message: "The list with the specified ID does not exist." })
          }
      })
      .catch(err => {
          console.log(err)
          res.status(500).json({ error: err, message: "The list information could not be retrieved." });
      })
    },

    getFavoritesByUserId: (id, res) => {
        return db.select('*')
          .from('favorites')
          .where( 'user_id', id )
          .then(favorite => {
            if(favorite.length > 0) {
                res.status(200).json(favorite)
            } else {
                res.status(404).json({ message: "The list with the specified ID does not exist." })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err, message: "The list information could not be retrieved." });
        })
    },

    //Add new Favorite
    addFavorite: (movie, res) => {
        if(movie.Title && movie.user_id) {
            db.insert(movie)
              .into('favorites')
              .then(id => {
                res.status(201).json(id[0])
              })
              .catch(err => {
                res.status(500).json({ error: err, message: 'Movie Could Not Be Added'})
              })
        } else {
            res.status(400).json({ message: "Missing Title or User_ID for the Movie." })
        }
    },

    deleteFavorite: (id, res) => {
        return db('favorites')
                .where({ id })
                .del()
                .then(success => {
                if(success) {
                    res.status(201).json(success);
                } else {
                    res.status(404).json({ message: "The movie with the specified ID does not exist." }) 
                }
                })
                .catch(err => {
                res.status(500).json({ error: err, message: "The movie could not be deleted." });
                });
    }
}