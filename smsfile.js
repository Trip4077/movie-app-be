const moment = require('moment');
const Nexmo = require('nexmo');

const nexmoConfig = new Nexmo({
    apiKey: process.env.enter,
    apiSecret: process.env.shh
}, { debuh: true });

const sendSms = movie => {
    const textInfo = {
        text: `${movie.title} is scheduled at ${movie.readTime} on ${movie.date}`,
        number: '12764691994'
    }
    console.log(textInfo);
    nexmoConfig.message.sendSms(
        '12153150647', textInfo.number, textInfo.text, { type: 'unicode' },
        (err, res) => {
            if(err) {
                console.log(err)
            } else {
                console.dir(res)
            }
        }
    )
}

module.exports = {
    compareDateTime: schedule => {
        if(schedule.date === (new Date().toDateString())
            && schedule.compareTime === moment().format('HH:mm')) {
                
            console.log(schedule);
            sendSms(schedule);
        } else {
            console.log(false);
        }
    },
}