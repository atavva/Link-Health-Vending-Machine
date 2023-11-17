const catchAsync = require('../utils/catchAsync');
const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
// googleapis

exports.sendContactFormInfo = catchAsync(async (req, res, next) => {


    const contactInfo = req.body;
    // Send an email to Link Health via contact form with info in the req object using nodemailer

    const oauth2Client = new OAuth2(
        '494778911159-1lge28b42ga3ra29po8m58er87ninojs.apps.googleusercontent.com', // ClientID
        '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', // Client Secret
        "https://developers.google.com/oauthplayground" // Redirect URL
   );

    oauth2Client.setCredentials({
        refresh_token: "Your Refresh Token Here"
    });
    const accessToken = oauth2Client.getAccessToken()

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            // user: 'linkhealthdummy@gmail.com',
            // pass: 'linkhealthdummy123',
            clientId: '494778911159-1lge28b42ga3ra29po8m58er87ninojs.apps.googleusercontent.com',
            clientSecret: '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',
            // refreshToken: '1//04aHooGmD1kwOCgYIARAAGAQSNwF-L9IrmqVEigyi_o1fQWkp7pVhl7-ZDFSPip6gF6ioiuAI0MZIYrTfzg50cKtSXG6leC_Ysl4',
            // tls: {
            //     rejectUnauthorized: false
            //   }
        }

    });

    const info = await transporter.sendMail({
        from: 'linkhealthdummy@gmail.com',
        to: 'linkhealthdummy@gmail.com',
        subject: `${contactInfo.firstName} ${contactInfo.lastName} linkhealth message`, //should be some string constructed from req
        text: `${contactInfo.message}`, //some version of req/res
        auth: {
            user:'linkhealthdummy@gmail.com',
            refreshToken: '1//04aHooGmD1kwOCgYIARAAGAQSNwF-L9IrmqVEigyi_o1fQWkp7pVhl7-ZDFSPip6gF6ioiuAI0MZIYrTfzg50cKtSXG6leC_Ysl4',
            accessToken: accessToken
        }
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