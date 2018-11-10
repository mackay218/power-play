const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");
 
// Router to send an email to an administrator
router.post('/', (req, res) => {
        console.log('message for contact', req.body);

        const contactObj = req.body

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                type: 'OAuth2',
                user: process.env.my_gmail_email,
                clientId: process.env.my_oauth_client_id,
                clientSecret: process.env.my_oauth_client_secret,
                refreshToken: process.env.my_oauth_refresh_token,
                accessToken: process.env.my_oauth_access_token,
            }
        });

        const homePageAnchor = process.env.set_home_page;

        const emailHtml = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
                <html xmlns="http://www.w3.org/1999/xhtml">
                <head>
                    <title>PPR Hockey Invite</title>
                    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0 " />
                    <link href="https://fonts.googleapis.com/css?family=Audiowide|Roboto:300,300i,400,400i,500,500i,700,700i" rel="stylesheet">
                    <style>
                        *{
                            box-sizing: border-box;
                        }
                        body{
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                        }
                         header{
                            display: flex;
                            flex-direction: row;
                            align-items: center;
                            justify-content: center;
                            background-color: #F0133E;
                            color: #fff;
                            width: 100vw;
                            padding: 20px;
                            font-family: 'Audiowide', sans-serif;
                        }
        
                        h1{
                            height: 100%;
                            padding-top: 40px;
                        }

                        a img{
                            width: 200px;
                            height: 200px;
                        }

                        main{
                            font-family: 'Roboto', sans-serif;
                            font-size: 20px;
                        }
                    </style>
                </head>
                <body>
                    <header>
                        <a href="${homePageAnchor}">
                            <img src="https://drive.google.com/uc?export=view&id=1w_MFiI3Y8M3hDV2nKx_2XyDr8olDI18y" alt="ppr hockey logo"/>
                        </a>
                    </header>
                    <main>
                        <div>
                            Name: ${contactObj.name}
                            <br/>
                            Email: ${contactObj.email}
                            <br/>
                            Message: ${contactObj.emailMessage}
                        </div>
                    </main>
                </body>
            </html>`;

        const mail = {
            from: "pprhockeydemo@gmail.com",
            to: "pprhockeydemo@gmail.com",
            subject: "Power Play Recruiting Contact",
            text: 'MESSAGE FROM PPR CONTACT PAGE',
            html: emailHtml
        }

        transporter.sendMail(mail, function (error, info) {
            if (error) {
                console.log('error sending mail:', error);
            }
            else {
                //see https://nodemailer.com/usage
                console.log("info.messageId: " + info.messageId);
                console.log("info.envelope: " + info.envelope);
                console.log("info.accepted: " + info.accepted);
                console.log("info.rejected: " + info.rejected);
                console.log("info.pending: " + info.pending);
                console.log("info.response: " + info.response);
            }
            transporter.close();
        })
        res.sendStatus(200);
    
    

});


module.exports = router;