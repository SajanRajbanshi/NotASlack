const nodemailer=require("nodemailer");
const generateSixDigitCode=require("./generateOTP");

const transporter = nodemailer.createTransport({
  service:"gmail",
  secure:true,
  port: 465,
  auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
  }
});

function sendMail(clientEmail)
{
    const OTP=generateSixDigitCode(clientEmail);
    console.log(process.env.EMAIL_USER);
    console.log(process.env.EMAIL_PASS);
    let mailOptions = {
        from: `Slack ${process.env.EMAIL_USER}`,
        to: clientEmail,
        subject:"Email Verification - Slack",
        text: `${OTP} is your One Time Password for Slack`,
      };
    transporter.sendMail(mailOptions,(err,info)=>
    {
        if(err)
        {
            console.log(err);
            return -1;
        }
        console.log("mail sent"+info.messageId);
        return 1;
    });
}

module.exports=sendMail;