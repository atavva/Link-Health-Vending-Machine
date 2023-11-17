const catchAsync = require('../utils/catchAsync');
const nodemailer = require('nodemailer');

exports.sendContactFormInfo = catchAsync(async (req, res, next) => {


    const contactInfo = req.body;
    // Send an email to Link Health via contact form with info in the req object using nodemailer

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            clientId: '494778911159-1lge28b42ga3ra29po8m58er87ninojs.apps.googleusercontent.com',
            clientSecret: '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',
            user: 'linkhealthdummy@gmail.com',
            pass: 'linkhealthdummy123'
        }

    });

    const info = await transporter.sendMail({
        from: 'test <linkhealthdummy@gmail.com>',
        to: 'test <linkhealthdummy@gmail.com>',

        subject: `${contactInfo.firstName} ${contactInfo.lastName} linkhealth message`, //should be some string constructed from req
        text: `${contactInfo.message}`, //some version of req/res
        // html: html
    })
    
    res.status(201).json({
        status: 'success',
    });

})

    /*

    req.query = {
        firstName: string,
        lastName: string,
        email: string,git
        message: string,
    }

    */