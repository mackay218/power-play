const express = require('express');
// const { rejectUnauthenticated } = require('../modules/authentication-middleware');
// const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');

const router = express.Router();

const moment = require('moment');

const nodemailer = require("nodemailer");

const Chance = require('chance');
const chance = new Chance();

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
        accessToken: process.env.my_oauth_access_token
    }
});

//function to add new coach to database
//only called by Admin
router.post('/coachInvite', (req, res) => {
    console.log(req.body);

    const coachInfo = req.body;
    
    const coachName = coachInfo.firstName; // this may change depending on client side route

    const emailAddress = coachInfo.emailAddress; //this may change depending on client side route

    const inviteCode = chance.string();

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
                            VALUES ($1, $2, $3, $4, $5, $6,) RETURNING "id";`;
            
            values = [emailAddress, role, coachName, inviteCode, accountStatusId, activityLogId];

            const personResult = await client.query(queryText, values);

            let personId = personResult.rows[0].id;

            await client.query('COMMIT');

            //if creating a coach works call function to send invite
            if(personId.length > 0){    
                this.sendInviteCode(coachInfo);
            }

            res.sendStatus(201);
        }
        catch (error) {
            console.log('ROLLBACK', error);
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }

    })().catch((error) => {
        console.log('CATCH', error);
        res.sendStatus(500);
    });
});

//function to send invite email
sendInviteCode = (coachInfo) => {

    console.log('in sendInviteCode');

    console.log(coachInfo);

    //create url string for page for link to 
    //where person can set or reset password

    // e.g. https://www.pprhockey.com/setPassword/[invite code here] 

    const mail = {
        from: "Polaris Hockey <polarishockey@gmail.com>",
        to: req.body.emailAddress,
        subject: "testing nodemailer eh",
        text: 'we invite you so join us' + req.body.emailAddress,
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
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
                        img{
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
                        <img src="https://drive.google.com/uc?export=view&id=1w_MFiI3Y8M3hDV2nKx_2XyDr8olDI18y" alt="ppr hockey logo"/>
                        <h1>YOU'VE BEEN INVITED!</h1>
                    </header>
                    <main>
                        <div>
                            <p>You've been invited to try Power Play Recruiting! Click the link below to join.</p>
                            <a>Link goes here.</a>
                        </div>
                    </main>
                </body>
            </html>`
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
    });
}

module.exports = router;