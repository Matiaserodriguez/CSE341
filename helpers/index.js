const { has } = require('lodash')

module.exports.trueOrFalse = (req, res) => {
    const contactSchema = {
        'firstName': '',
        'lastName': '',
        'email': '',
        'favoriteColor': '',
        'birthday': '',
        'hobbie': '',
        'profession': '',
        'nickname': ''
    }

    let trueOrFalse = true;

    Object.keys(req.body).forEach(element => {
        if (!has(contactSchema, element)) {
            res.status(400).send(JSON.stringify({
                "status": "400",
                "msg": "Something failed. Please provide at least one of the following fields: firstName, lastName, email, favoriteColor, birthday, hobbie, profession or nickname "
            }))
            trueOrFalse = false;
        }
    })

    return trueOrFalse
}