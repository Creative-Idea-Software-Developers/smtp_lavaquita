require('dotenv').config()
const express = require('express')
const app = express()
const nodemailer = require("nodemailer");
const port = process.env.PORT

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Creative Idea')
})

app.post('/sendMail', async (req, res) => {
    let transporter = nodemailer.createTransport({
        host: process.env.hostMail,
        port: process.env.portMail,
        secure: true,
        auth: {
          user: process.env.mailHost,
          pass: process.env.passMail,
        },
      });

      let info = await transporter.sendMail({
        from: '"La Vaquita Facturas" <'+process.env.mailHost+'>', // sender address
        to: process.env.receiverMail, // list of receivers
        subject: "Factura/Boleta", // Subject line
        text: JSON.stringify(req.body), // plain text body
      });
      
      info.accepted.length > 0 ? res.status(200).send('Mail sent') : res.status(400).send('Mail not sent')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})