const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        from: 'digitalsho19@gmail.com',
        to: email,
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    });
};

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        from: 'digitalsho19@gmail.com',
        to: email,
        subject: 'We are sorry you are leaving us!',
        text: `Goodbye ${name}! Is there something we could do for you to return?`
    });
};

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
};