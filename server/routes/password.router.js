const express = require('express');
// const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');

const router = express.Router();

const moment = require('moment');

const nodemailer = require("nodemailer");

const Chance = require('chance');
const chance = new Chance();

//function to add new coach to database
//only called by Admin
router.post('/coachInvite', (req, res) => {
    console.log('in coachInvite post');
    console.log(req.body);

    const coachInfo = req.body;
    
    const coachName = coachInfo.name; // this may change depending on client side route

    const emailAddress = coachInfo.email; //this may change depending on client side route

    //limit inivite code to alphanumeric to avoid url problems
    const inviteCode = chance.string({ pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'});

    const infoForEmail = {
        name: coachName,
        email: emailAddress,
        inviteCode: inviteCode
    };

    const role = 'coach'; 

    const statusType = 'pending';
    const reason = 'awaiting response from invite';

    const activityType = 'invite sent';
    const activityTime = new Date();

    (async () => {

        const client = await pool.connect();

        try{
            //insert status for coach in account_status
            let queryText = `INSERT INTO account_status(status_type, reason) 
                                VALUES ($1, $2) RETURNING "id";`;
            let values = [statusType, reason];

            const accountStatusResult = await client.query(queryText, values);

            let accountStatusId = accountStatusResult.rows[0].id;

            queryText = `INSERT INTO activity_log(time, activity_type)
                            VALUES ($1, $2) RETURNING "id";`;
            
            values = [activityTime, activityType];
            
            const activityLogResult = await client.query(queryText, values);

            let activityLogId = activityLogResult.rows[0].id;

            queryText = `INSERT INTO person(email, role, coach_name, invite, status_id, activity_log_id)
                            VALUES ($1, $2, $3, $4, $5, $6) RETURNING "id";`;
            
            values = [emailAddress, role, coachName, inviteCode, accountStatusId, activityLogId];

            const personResult = await client.query(queryText, values);

            let personId = personResult.rows[0].id;

            await sendInviteCode(infoForEmail);
                
            await client.query('COMMIT');

            res.sendStatus(201);
        }
        catch (error) {
            console.log('ROLLBACK', error);
            await client.query('ROLLBACK');
            throw error;
        } finally {
            //if creating a coach works call function to send invite
            
            client.release();
        }

    })().catch((error) => {
        console.log('CATCH', error);
        res.sendStatus(500);
    });
});

//function to send invite email
sendInviteCode = (infoForEmail) => {

    console.log('in sendInviteCode');

    console.log(infoForEmail);

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com', //do I need to change this line?
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: process.env.my_gmail_email,
            clientId: process.env.my_oauth_client_id,
            clientSecret: process.env.my_oauth_client_secret,
            refreshToken: process.env.my_oauth_refresh_token,
            accessToken: process.env.my_oauth_access_token,
            expires: 1527200298318 + 3600 
        }
    });
    
    // console.log('my_gmail_email', process.env.my_gmail_email);
    // console.log('my_oauth_client_id', process.env.my_oauth_client_id);
    // console.log('my_oauth_client_secret', process.env.my_oauth_client_secret);
    // console.log('my_oauth_refresh_token', process.env.my_oauth_refresh_token);
    // console.log('my_oauth_access_token', process.env.my_oauth_access_token);

    const inviteCode = infoForEmail.inviteCode;

    const name = infoForEmail.name;
    //create url string for page for link to 
    //where person can set or reset password

    const websiteUrl = process.env.set_password_page;

    const inviteUrlAnchor = `<a target="_blank" href="${websiteUrl}${inviteCode}">Confirm Registration</a>`; 

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
                        <h1>YOU'VE BEEN INVITED!</h1>
                    </header>
                    <main>
                        <div>
                            <p>Hi! ${name},
                                 You've been invited to try Power Play Recruiting! 
                                 Click the link below to join.
                            </p>
                            ${inviteUrlAnchor}
                        </div>
                    </main>
                </body>
            </html>`;


    const mail = {
        from: "polarishockey@gmail.com",
        to: infoForEmail.email,
        subject: "testing nodemailer eh",
        text: 'we invite you so join us' + infoForEmail.name,
        html: emailHtml
    }

    //console.log('mail', mail);

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
    });
}

//post route for new password / resetting password
router.put('/setPassword', (req, res) => {
    console.log('password info:', req.body);

    const passwordInfo = req.body;
    const inviteCode = passwordInfo.inviteCode;
    const password = encryptLib.encryptPassword(passwordInfo.password);

    const queryText = `UPDATE person SET "password" = $1 WHERE "invite" = $2;`;

    pool.query(queryText, [password, inviteCode])
        .then(() => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log('error resetting password in server:', error);
            res.sendStatus(500);
        });

});

module.exports = router;