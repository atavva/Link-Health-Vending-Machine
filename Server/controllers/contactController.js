const catchAsync = require('../utils/catchAsync');
const nodemailer = require('nodemailer');

exports.sendContactFormInfo = catchAsync(async (req, res, next) => {


    const contactInfo = req.query;
    // Send an email to Link Health via contact form with info in the req object using nodemailer

        /*

    req.query = {
        firstName: string,
        lastName: string,
        email: string,
        message: string,
    }

    */
   
    async function main(){

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'aayushpatel27@gmail.com',
                pass: '...'
            }

        });

        const info = await transporter.sendMail({
            from: 'test <aayushpatel27@gmail.com>',
            to: 'test' <'aayushpatel27@gmail.com',

            subject: 'testing testing testing', //should be some string constructed from req
            text: 'text', //some version of req/res
            html: html
        })

        console.log("message sent" + info.messageID);
        console.log(info.accepted);
        console.lob(info.rejected);

    }

    main()
    .catch(e=>console.log(e));


})

    /*

    req.query = {
        firstName: string,
        lastName: string,
        email: string,git
        message: string,
    }

    */