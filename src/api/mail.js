export const sendEmail = async () => {
    try {
      // create the nodemailer transporter with your SMTP credentials
      const transporter = nodemailer.createTransport({
        host: 'smtp.example.com',
        port: 587,
        secure: false,
        auth: {
          user: 'your_username',
          pass: 'your_password'
        }
      });
  
      // set the email options
      const mailOptions = {
        from: 'sender@example.com',
        to: 'recipient@example.com',
        subject: 'HTML webpage from React',
        html: '<html><body><h1>Hello World!</h1></body></html>'
      };
  
      // send the email
      const info = await transporter.sendMail(mailOptions);
      // console.log('Email sent: ' + info.response);
    } catch (error) {
      console.log(error);
    }
  };
  