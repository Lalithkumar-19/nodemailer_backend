// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = process.env.PORT || 3001;
const cors=require("cors");
require("dotenv").config();
app.use(express.json());
app.use(cors());
// Configure Nodemailer with your email provider details
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'lalithkumar19180@gmail.com',
    pass: process.env.password,
  },
});

app.get("/",(req,res)=>{
    res.send("Hello World");
});


app.post('/sendmsg', (req, res) => {
  const { name, email, message } = req.body;
  if(name!=="" && email!==""&&message!==''){
    console.log("it is called");
    console.log(req.body);
  
    // Define the email content
    const mailOptions = {
      from: "lalithkumar19180@gmail.com",
      to: "lalithdev123@gmail.com",
      subject: `New Contact Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };
  
    // Send the email using Nodemailer
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error sending email');
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).send('Email sent successfully');
      }
    });


  }
  else{
    console.log("provide all things");
    res.status(500).send("please provide all credentials to pass your message");
  }

});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
