// Nodemailer is a module for Node.js applications to allow easy as cake email sending. 
require("dotenv/config");
const nodemailer = require("nodemailer");
const logger = require("./logger");

nodemailerFunctions = {
    async sendMail(req, res, next){
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "nrjbhavnani@gmail.com",
                pass: process.env.SENDER_PASS
            }
        });
        
        const options= {
            from: "'Fundoo API Admin' <nrjbhavnani@gmail.com>",
            to: "neerajbhavnani24@gmail.com",
            subject: "Reset Password Link for Fundoo API",
            html: `<b>Reset your password: </b> <br> <a href='http://localhost:8080/reset/${res._token}'>RESET</a> <br> Access Token: ${res._token}`
        };
        
        await transporter.sendMail(options, (error, info) => {
            if(error){
                logger.error(`Status: ${res.statusCode}: ${error.message}`);
                return res.status(500).json({ message: error.messages });
            }else{
                logger.verbose(`Status: ${res.statusCode}: Email Sent: ${info.response}`);
            }
        });
    }
};

module.exports = nodemailerFunctions;