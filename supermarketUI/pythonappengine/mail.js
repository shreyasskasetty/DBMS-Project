const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
      user:'shreyas30kasetty@gmail.com',
      pass: 'azwbcedelvpxmphx'
    }
  });
  const mailOptions={
    from:'shreyas30kasetty@gmail.com',
    to:'shreyasskasetty.cs17@rvce.edu.in',
    subject: 'Registration Status',
    text: 'Success'
  }
  transporter.sendMail(mailOptions, function(error, info){
    if(error)
    {
      console.log(error);
    }else{
      console.log('Email sent: '+info.response);
    }
  })