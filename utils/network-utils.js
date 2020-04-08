const nodemailer = require('nodemailer');

const keys = require('../config/keys');

exports.sendEmail = async (to, subject, body) => {
    try {
        const transporter = nodemailer.createTransport({
            host: keys.SMTP.HOST,
            port: keys.SMTP.PORT,
            secure: false,
            auth: {
                user: keys.SMTP.USER,
                pass: keys.SMTP.PASSWORD
            },
            tls: {
                rejectUnauthorized: false
            }
        });
    
        const info = await transporter.sendMail({
            from: `Support Answer's Hub ${keys.SMTP.USER}`, // sender address
            to: to,
            subject: subject,
            html: body
        });
        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        throw error
    }

}