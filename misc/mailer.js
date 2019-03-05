const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "bobnikeacc69@gmail.com",
    pass: "619619eric"
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
