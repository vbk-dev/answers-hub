const nodemailer = require('nodemailer');

exports.sendEmail = async (to, subject, body) => {
    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false, 
        auth: {
          user: process.env.SMTP_USER, 
          pass: process.env.SMTP_PASSWORD, 
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const messageInfo = await transporter.sendMail({
        from: `"Answers Hub Support" <${process.env.SMTP_USER}>`,
        to,
        subject,
        html: body,
    });
}