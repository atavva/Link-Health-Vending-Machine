const catchAsync = require('../utils/catchAsync');
const nodemailer = require('nodemailer');

exports.sendContactFormInfo = catchAsync(async (req, res, next) => {

    const contactInfo = req.query;

    /*

    req.query = {
        firstName: string,
        lastName: string,
        email: string,
        message: string,
    }

    */

})