const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.USR_EMAIL,
    pass: process.env.USR_PWD
  },
  tls: {
    rejectUnauthorized: false
  }
});

module.exports = {
  sendEmail(from, to, subject, html) {
    return new Promise((resolve, reject) => {
      transporter.sendMail({ from, to, subject, html }, (err, info) => {
        if (err) reject(err);
        resolve(info);
      });
    });
  }
};
