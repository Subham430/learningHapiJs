const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "2c972bd07938b1",
      pass: "176e88d891fca8"
    }
  });

module.exports = {
    transport
}