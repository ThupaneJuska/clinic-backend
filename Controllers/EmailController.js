require('dotenv').config();

const nodemailer = require("nodemailer");

module.exports = {
    send_email: async (req, res) => {
        try {
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port:465,
                secure:true,
                auth: {
                    user: process.env.APP_MAIL,
                    pass: "jimz ysri ffqn ctik"
                },
                tls: {
                    // do not fail on invalid certs
                    rejectUnauthorized: false,
                  },
            });

            // send mail with defined transport object
            let info = await transporter.sendMail({
                from: `"DO-NOT-REPLY" <${process.env.APP_MAIL}>`, // sender address
                to: req.body.to, // list of receivers
                subject: req.body.subject, // Subject line
                text: req.body.text, // plain text body
                html: `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <meta name="viewport" content="width=device-width">
                        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                        <style>
                            p span{
                            color:green
                            }
                        </style>
                    </head>
                    
                    <body>
                        ${req.body.html}
                    </body>
                    </html>
                `, // html body
            });
        } catch (err) {
            console.log(err);
        }
    }
}