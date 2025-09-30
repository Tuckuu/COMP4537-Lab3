const {greeting} = require('../lang/messages/en/greeting');

function getDate(name) {
    const date = new Date();
    const safeName = name ? name : "You";
    const message = greeting.replace('%1', safeName) + date.toString();
    return message;
}

exports.getDate = getDate;