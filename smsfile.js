const moment = require('moment');
const Nexmo = require('nexmo');
const db = require('./data/models/userModel');

const nexmoConfig = new Nexmo({
    apiKey: process.env.enter,
    apiSecret: process.env.shh
}, { debuh: true });

const sendSms = movie => {
    id = { id: movie.user_id }

    let userNumber; 
    db.findBy(id)
        .then(res => {
            userNumber = res[0].number;
            console.log(userNumber);

            const textInfo = {
                text: `${movie.title} is scheduled at ${movie.readTime} on ${movie.date}`,
                number: userNumber
            }

                    
            nexmoConfig.message.sendSms(
                '12153150647', textInfo.number, textInfo.text, { type: 'unicode' },
                (err, res) => {
                    if(err) {
                        console.log(err)
                    } else {
                        //console.dir(res)
                    }
                }
            );
        })
        .catch(err => {
            console.log('error:', err);
        });
}

module.exports = {
    compareDateTime: schedule => {
        if(schedule.date === (new Date().toDateString())
            && schedule.compareTime === moment().format('HH:mm')) {  

            sendSms(schedule);

        } else {
            return;
        }
    },
}