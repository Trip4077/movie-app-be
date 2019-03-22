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
    }
}