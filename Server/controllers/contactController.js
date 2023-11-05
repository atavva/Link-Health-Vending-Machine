const catchAsync = require('../utils/catchAsync');
const nodemailer = require('nodemailer');

exports.sendContactFormInfo = catchAsync(async (req, res, next) => {


    req.query = {
        firstName: string,
        lastName: string,
        email: string,
        message: string,
    }
    
    const contactInfo = req.query;
    // Send an email to Link Health via contact form with info in the req object using nodemailer

        




   
    async function main(){

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
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