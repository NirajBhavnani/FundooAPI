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
            from: "'Lucifer Morningstar' <nrjbhavnani@gmail.com>",
            to: "neerajbhavnani24@gmail.com",
            subject: "Hello Detective!!",
            html: "<b>What is it you desire?</b> <br> <a href='https://youtu.be/ueMwVGBwqRo'>CLICK FOR DESIRES</a>"
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